const mqtt = require("mqtt");
const uuid = require("uuid");

const { matchUsers } = require("../models/matching-repository");
const { QUEUES } = require("../utils/constants");

let options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASWORD,
  clientId: `subscribe_${uuid.v1()}`,
  port: 1883,
};

const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
client.on("connect", () => {
  client.subscribe(QUEUES.FIND_MATCH_QUEUE);
});

client.on("message", async (topic, res) => {
  if (topic === QUEUES.FIND_MATCH_QUEUE) {
    const matchData = await matchUsers(JSON.parse(res.toString()));
    client.publish(QUEUES.FIND_MATCH_QUEUE_REPLY, JSON.stringify(matchData));
  }
});
