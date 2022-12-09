var stompjs = require("stompjs");

const { matchUsers } = require("../models/matching-repository");

var client = stompjs.overWS("ws://localhost:61614/stomp");
var headers = {
  login: "admin",
  passcode: "admin",
};
// client.debug = console.log;
client.connect(headers, function (error) {
  console.log("ActiveMQ connected");

  client.subscribe("/queue/findMatch", async (data) => {
    const matchData = await matchUsers(JSON.parse(data.body));
    client.send("/queue/findMatchReply", {}, JSON.stringify(matchData));
  });
});
