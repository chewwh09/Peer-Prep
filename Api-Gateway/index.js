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

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);

io.on("connection", (socket) => {
  console.log("New Websocket connection", socket.id);

  var client = initiateQueue(io);

  socket.on("findMatch", (data) => {
    socket.join("waitingRoom");
    sendMessage(client, data); // Include questions to set up frontend page.
  });

  socket.on("joinRoom", ({ roomId }) => {
    socket.leave("waitingRoom");
    socket.join(roomId);
  });

  socket.on("code", ({ roomId, code }) => {
    socket.broadcast.to(roomId).emit("updateCode", code);
  });

  socket.on("disconnect", () => {
    console.log("A socket has disconnected");
    disconnectQueue(client);
    client = null;
  });
});

server.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
