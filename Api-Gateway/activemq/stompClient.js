var stompjs = require("stompjs");

const { SOCKET_EVENTS, QUEUES } = require("../utils/constants");

// client.debug = console.log;
const initiateQueue = (io) => {
  const client = stompjs.overWS("ws://localhost:61614/stomp");
  var headers = {
    login: "admin",
    passcode: "admin",
  };

  client.connect(headers, function (error) {
    console.log("ActiveMQ connected");

    client.subscribe(QUEUES.FIND_MATCH_QUEUE_REPLY, (data) => {
      const parsedData = JSON.parse(data.body);
      if (parsedData.usernameTwo !== "") {
        io.to(SOCKET_EVENTS.WAITING_ROOMS).emit(
          SOCKET_EVENTS.MATCH_FOUND,
          parsedData
        );
      }
    });
  });

  return client;
};

const sendMessage = (client, data) => {
  if (!client) {
    return console.log("Client hasn't been setup");
  }
  client.send(QUEUES.FIND_MATCH_QUEUE, {}, JSON.stringify(data));
};

const disconnectQueue = (client) => {
  if (client) {
    console.log("disconnecting queue");
    client.disconnect();
  }
};

module.exports = { initiateQueue, disconnectQueue, sendMessage };
