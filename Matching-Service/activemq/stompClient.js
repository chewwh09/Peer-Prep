const mqtt = require("mqtt");
const uuid = require("uuid");

const { matchUsers } = require("../models/matching-repository");
const { TOPICS } = require("../utils/constants");

let options = {
  username: process.env.ACTIVE_MQ_USERNAME,
  password: process.env.ACTIVE_MQ_PASWORD,
  clientId: `subscribe_${uuid.v1()}`,
  port: 1883,
};

const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
client.on("connect", () => {
  client.subscribe(TOPICS.FIND_MATCH_TOPIC);
});

client.on("message", async (topic, res) => {
  if (topic === TOPICS.FIND_MATCH_TOPIC) {
    const matchData = await matchUsers(JSON.parse(res.toString()));
    client.publish(TOPICS.FIND_MATCH_REPLY_TOPIC, JSON.stringify(matchData));
  }
});
