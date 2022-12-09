const axios = require("axios");

const response = require("../utils/responseFormat");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const routes = require("../config/config");

const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const response = await axios.get(`${routes.USER_SERVICE_URL}/users/me`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) throw new Error();

    req.user = response.data;
    req.token = token;
    next();
  } catch (e) {
    res
      .status(401)
      .send(response(STATUS_CODE[401], RESPONSE_MESSAGE.UNATHENTICATED, {}));
  }
};

const socketAuth = async (socket, next) => {
  const token = socket?.handshake?.headers?.authorization;
  //const token = socket.handshake.auth.token;
  const response = await axios.get(`${routes.USER_SERVICE_URL}/users/me`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.status !== 200) {
    return new Error("Not authenticated");
  }

  return next();
};

module.exports = { auth, socketAuth };
