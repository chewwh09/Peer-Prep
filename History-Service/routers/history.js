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
    const data = req.body;
    const userOneHistory = await saveUserHistory(
      data.usernameOne,
      data.questionDifficulty,
      data.questionTitle,
      data.questionContent
    );
    const userTwoHistory = await saveUserHistory(
      data.usernameTwo,
      data.questionDifficulty,
      data.questionTitle,
      data.questionContent
    );
    res
      .status(201)
      .send(
        response(STATUS_CODE[201], RESPONSE_MESSAGE.CREATE_SUCCESS, [
          userOneHistory,
          userTwoHistory,
        ])
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
