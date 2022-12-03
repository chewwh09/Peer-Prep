const express = require("express");
const axios = require("axios");

const response = require("../utils/responseFormat");
const { statusCode, responseMessage } = require("../utils/responseConstant");

const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8001/users", req.body);
    res.send(response.data);
  } catch (e) {
    res
      .status(400)
      .send(response(statusCode[400], responseMessage.CREATE_FAILED, e));
  }
});

router.post("/users/login", async (req, res) => {});

router.post("/users/logout", async (req, res) => {});

router.post("/users/logoutAll", async (req, res) => {});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res
      .status(500)
      .send(
        response(statusCode[500], responseMessage.INTERNAL_SERVER_ERROR, {})
      );
  }
});

router.patch("/users/me", async (req, res) => {});

router.delete("/users/me", async (req, res) => {});

module.exports = router;
