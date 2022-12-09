const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");

const {
  initiateQueue,
  disconnectQueue,
  sendMessage,
} = require("./activemq/stompClient");

const userRouter = require("./routers/user");
const { SOCKET_EVENTS } = require("./utils/constants");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);

io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
  console.log("New Websocket connection", socket.id);

  var client = initiateQueue(io);

  socket.on(SOCKET_EVENTS.FIND_MATCH, (data) => {
    socket.join(SOCKET_EVENTS.WAITING_ROOMS);
    sendMessage(client, data);
  });

  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ roomId }) => {
    socket.leave(SOCKET_EVENTS.WAITING_ROOMS);
    socket.join(roomId);
    // io.to(roomId).emit(SOCKET_EVENTS.UPDATE_QUESTION, question)
    // question fetch from question microservices
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

server.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
