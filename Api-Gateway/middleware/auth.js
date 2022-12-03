const axios = require("axios");

const response = require("../utils/responseFormat");
const { statusCode, responseMessage } = require("../utils/responseConstant");

const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const response = await axios.get("http://localhost:8001/users/me", {
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
