const axios = require("axios");

const response = require("../utils/responseFormat");
const { statusCode, responseMessage } = require("../utils/responseConstant");
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
      .send(response(statusCode[401], responseMessage.UNATHENTICATED, {}));
  }
};

module.exports = auth;
