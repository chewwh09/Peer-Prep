const routes = {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8001",
  MATCHING_SERVICE_URL:
    process.env.MATCHING_SERVICE_URL || "http://localhost:8002",
  QUESTION_SERVICE_URL:
    process.env.QUESTION_SERVICE_URL || "http://localhost:8003",
};

module.exports = routes;
