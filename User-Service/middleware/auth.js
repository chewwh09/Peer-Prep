const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = (req, res, next) => {
  try {
    next();
  } catch {}
};

module.exports = auth;
