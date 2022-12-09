const jwt = require("jsonwebtoken");

const User = require("../models/user-orm");
const config = require("../config/config");

const response = require("../utils/responseFormat");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.SECRET_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch {
    res
      .status(401)
      .send(response(STATUS_CODE[401], RESPONSE_MESSAGE.UNATHENTICATED, {}));
  }
};

module.exports = auth;
