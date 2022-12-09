const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  updateProfile,
  deleteUser,
} = require("../models/user-repository");
const auth = require("../middleware/auth");
const response = require("../utils/responseFormat");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res
      .status(201)
      .send(response(STATUS_CODE[201], RESPONSE_MESSAGE.CREATE_SUCCESS, data));
  } catch (e) {
    res
      .status(400)
      .send(response(STATUS_CODE[400], RESPONSE_MESSAGE.CREATE_FAILED, {}));
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const data = await loginUser(req.body.email, req.body.password);
    res.send(response(STATUS_CODE[200], RESPONSE_MESSAGE.LOGIN_SUCCESS, data));
  } catch {
    res
      .status(400)
      .send(response(STATUS_CODE[400], RESPONSE_MESSAGE.LOGIN_FAILURE, {}));
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    await logoutUser(req.user, req.token);
    res.send(response(STATUS_CODE[200], RESPONSE_MESSAGE.LOGOUT_SUCCESS, {}));
  } catch (e) {
    res
      .status(500)
      .send(response(STATUS_CODE[500], RESPONSE_MESSAGE.LOGIN_FAILURE, {}));
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    await logoutAllUsers(req.user);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(
    response(STATUS_CODE[200], RESPONSE_MESSAGE.READ_USER_PROFILE, req.user)
  );
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const { updatedUser, error } = await updateProfile(req.body, req.user);

    if (error) throw new Error(error);

    res.send(
      response(
        STATUS_CODE[200],
        RESPONSE_MESSAGE.UPDATE_USER_SUCCESS,
        updatedUser
      )
    );
  } catch (e) {
    res
      .status(400)
      .send(
        response(STATUS_CODE[400], RESPONSE_MESSAGE.UPDATE_USER_FAILURE, e)
      );
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await deleteUser(req.user);
    res.send(
      response(STATUS_CODE[200], RESPONSE_MESSAGE.DELETE_USER_SUCCESS, req.user)
    );
  } catch (e) {
    res
      .status(500)
      .send(
        response(STATUS_CODE[500], RESPONSE_MESSAGE.DELETE_USER_FAILURE, e)
      );
  }
});

module.exports = router;
