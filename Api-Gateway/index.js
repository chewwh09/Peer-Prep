const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

const userRouter = require("./routers/user");
const initiateSocket = require("./socket/socketio");
const { initiateRedis } = require("./redis/redisClient");

dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8000;

initiateRedis();

app.use(express.json());
app.use(userRouter);

initiateSocket(server);

server.listen(port, () => {
  console.log("API-Gateway server is up on port", port);
});
