var stompjs = require("stompjs");

const { matchUsers } = require("../models/matching-repository");
const { QUEUES } = require("../utils/constants");

var client = stompjs.overWS("ws://localhost:61614/stomp");
var headers = {
  login: "admin",
  passcode: "admin",
};
// client.debug = console.log;
client.connect(headers, function (error) {
  console.log("ActiveMQ connected");

  client.subscribe(QUEUES.FIND_MATCH_QUEUE, async (data) => {
    const matchData = await matchUsers(JSON.parse(data.body));
    client.send(QUEUES.FIND_MATCH_QUEUE_REPLY, {}, JSON.stringify(matchData));
  });
});
