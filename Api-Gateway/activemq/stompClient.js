const mqtt = require("mqtt");
const uuid = require("uuid");

const { SOCKET_EVENTS, QUEUES } = require("../utils/constants");

const initiateQueue = (socket, username) => {
  let options = {
    username: process.env.ACTIVE_MQ_USERNAME,
    password: process.env.ACTIVE_MQ_PASWORD,
    clientId: `publish_${uuid.v1()}`,
    port: 1883,
  };

  const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
  client.on("connect", () => {
    client.subscribe(QUEUES.FIND_MATCH_QUEUE_REPLY);
  });

  client.on("message", (topic, res) => {
    if (topic === QUEUES.FIND_MATCH_QUEUE_REPLY) {
      const parsedData = JSON.parse(res.toString());
      if (
        parsedData.usernameTwo !== "" &&
        (parsedData.usernameOne === username ||
          parsedData.usernameTwo === username)
      ) {
        socket.emit(SOCKET_EVENTS.MATCH_FOUND, parsedData);
      }
    }
  });
  return client;
};

const sendMessage = (client, data) => {
  client.publish(QUEUES.FIND_MATCH_QUEUE, JSON.stringify(data));
};

const disconnectQueue = (client) => {
  if (client) {
    console.log("disconnecting queue");
    client.end();
  }
};

module.exports = { initiateQueue, disconnectQueue, sendMessage };
