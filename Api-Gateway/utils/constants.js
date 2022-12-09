const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  WAITING_ROOMS: "waitingRoom",
  FIND_MATCH: "findMatch",
  MATCH_FOUND: "matchFound",
  JOIN_ROOM: "joinRoom",
  CODE: "code",
  UPDATE_CODE: "updateCode",
  UPDATE_QUESTION: "updateQuestion",
};

const QUEUES = {
  FIND_MATCH_QUEUE: "/queue/findMatch",
  FIND_MATCH_QUEUE_REPLY: "/queue/findMatchReply",
};

module.exports = { SOCKET_EVENTS, QUEUES };
