const socketio = require("socket.io");
const axios = require("axios");

const {
  initiateQueue,
  disconnectQueue,
  sendMessage,
} = require("../activemq/stompClient");
const { SOCKET_EVENTS } = require("../utils/constants");
const routes = require("../config/config");
const { socketAuth } = require("../middleware/auth");

const initiateSocket = (server) => {
  const io = socketio(server);

  io.use(socketAuth); // If auth fails, the client has to listen to connect_error event to handle

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log("New Websocket connection", socket.id);

    var client = initiateQueue(io);

    socket.on(SOCKET_EVENTS.FIND_MATCH, (data) => {
      socket.join(SOCKET_EVENTS.WAITING_ROOMS);
      sendMessage(client, data);
    });

    socket.on(SOCKET_EVENTS.TIMEOUT, async (data) => {
      await axios.delete(`${routes.MATCHING_SERVICE_URL}/matching`, {
        data,
      });
    });

    socket.on(SOCKET_EVENTS.JOIN_ROOM, async ({ roomId }) => {
      socket.leave(SOCKET_EVENTS.WAITING_ROOMS);
      socket.join(roomId);
    });

    socket.on(SOCKET_EVENTS.GET_QUESTION, async ({ roomId, difficulty }) => {
      const response = await axios.get(
        `${routes.QUESTION_SERVICE_URL}/questions/getQuestion/${difficulty}`
      );
      const questionJSON = response.data;
      io.to(roomId).emit(SOCKET_EVENTS.UPDATE_QUESTION, questionJSON);
    });

    socket.on(SOCKET_EVENTS.CODE, ({ roomId, code }) => {
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.UPDATE_CODE, code);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("A socket has disconnected");
      disconnectQueue(client);
      client = null;
    });
  });
};

module.exports = initiateSocket;
