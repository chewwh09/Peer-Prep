const express = require("express");

const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const response = require("../utils/responseFormat");
const {
  getUserHistory,
  saveUserHistory,
} = require("../models/history-repository");

const router = new express.Router();

router.post("/history", async (req, res) => {
  try {
    const userHistory = await saveUserHistory(req.body);
    res
      .status(201)
      .send(
        response(STATUS_CODE[201], RESPONSE_MESSAGE.CREATE_SUCCESS, userHistory)
      );
  } catch (e) {
    res
      .status(500)
      .send(response(STATUS_CODE[500], RESPONSE_MESSAGE.CREATE_FAILED, {}));
  }
});

router.get("/history/:username", async (req, res) => {
  try {
    const userHistory = await getUserHistory(req.params.username);
    res.send(
      response(
        STATUS_CODE[200],
        RESPONSE_MESSAGE.READ_USER_HISTORIES_SUCESS,
        userHistory
      )
    );
  } catch (e) {
    res
      .status(500)
      .send(
        response(
          STATUS_CODE[500],
          RESPONSE_MESSAGE.READ_USER_HISTORIES_FAILED,
          []
        )
      );
  }
});

module.exports = router;
