const express = require("express");

const User = require("../models/user");
const auth = require("../middleware/auth");
const response = require("../utils/responseFormat");
const statusCode = require("../utils/statusCode");
const responseMessage = require("../utils/responseMessage");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send(
      response(statusCode[201], responseMessage.CREATE_SUCCESS, {
        user,
        token,
      })
    );
  } catch (e) {
    res
      .status(400)
      .send(response(statusCode[400], responseMessage.CREATE_FAILED, e));
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send(
      response(statusCode[200], responseMessage.LOGIN_SUCCESS, { user, token })
    );
  } catch {
    res
      .status(400)
      .send(response(statusCode[400], responseMessage.LOGIN_FAILURE, {}));
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send(response(statusCode[200], responseMessage.LOGOUT_SUCCESS, {}));
  } catch (e) {
    res
      .status(500)
      .send(response(statusCode[500], responseMessage.LOGIN_FAILURE, {}));
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(
    response(statusCode[200], responseMessage.READ_USER_PROFILE, req.user)
  );
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(
      response(statusCode[200], responseMessage.UPDATE_USER_SUCCESS, req.user)
    );
  } catch (e) {
    res
      .status(400)
      .send(response(statusCode[400], responseMessage.UPDATE_USER_FAILURE, e));
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(
      response(statusCode[200], responseMessage.DELETE_USER_SUCCESS, req.user)
    );
  } catch (e) {
    res
      .status(500)
      .send(response(statusCode[500], responseMessage.DELETE_USER_FAILURE, e));
  }
});

module.exports = router;
