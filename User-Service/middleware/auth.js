const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config/config");

const response = require("../utils/responseFormat");
const statusCode = require("../utils/statusCode");
const responseMessage = require("../utils/responseMessage");

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
      .send(response(statusCode[401], responseMessage.UNATHENTICATED, {}));
  }
};

module.exports = auth;
