const axios = require("axios");

const response = require("../utils/responseFormat");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const routes = require("../config/config");
const { getRedisCacheValue } = require("../redis/redisClient");

const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    const user = await getRedisCacheValue(token, async () => {
      console.log("cache miss");
      const response = await axios.get(`${routes.USER_SERVICE_URL}/users/me`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status !== 200) throw new Error();
      return response.data.data;
    });

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    return res
      .status(401)
      .send(response(STATUS_CODE[401], RESPONSE_MESSAGE.UNATHENTICATED, {}));
  }
};

const socketAuth = async (socket, next) => {
  const token = socket?.handshake?.headers?.authorization;
  if (!token) return new Error("Not authenticated");

  try {
    const user = await getRedisCacheValue(token, async () => {
      console.log("cache miss");
      const response = await axios.get(`${routes.USER_SERVICE_URL}/users/me`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status !== 200) throw new Error("Not authenticated");
      return response.data.data;
    });
    socket.username = user.name;
    next();
  } catch (e) {
    next(new Error());
  }
};

module.exports = { auth, socketAuth };
