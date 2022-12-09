var stompjs = require("stompjs");

// client.debug = console.log;
const initiateQueue = (io, joinRoom) => {
  const client = stompjs.overWS("ws://localhost:61614/stomp");
  var headers = {
    login: "admin",
    passcode: "admin",
  };

  client.connect(headers, function (error) {
    console.log("ActiveMQ connected");

    client.subscribe("/queue/findMatchReply", (data) => {
      const parsedData = JSON.parse(data.body);
      if (parsedData.usernameTwo !== "") {
        io.to("waitingRoom").emit("matchFound", parsedData);
      }
    });
  });

  return client;
};

const sendMessage = (client, data) => {
  if (!client) {
    return console.log("Client hasn't been setup");
  }
  client.send("/queue/findMatch", {}, JSON.stringify(data));
};

const disconnectQueue = (client) => {
  if (client) {
    console.log("disconnecting queue");
    client.disconnect();
  }
};

module.exports = { initiateQueue, disconnectQueue, sendMessage };
