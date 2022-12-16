const express = require("express");
const axios = require("axios");

const response = require("../utils/responseFormat");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const routes = require("../config/config");
const { auth } = require("../middleware/auth");
const { deleteRedisCacheKey } = require("../redis/redisClient");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const response = await axios.post(
      `${routes.USER_SERVICE_URL}/users`,
      req.body
    );
    res.status(201).send(response.data);
  } catch (e) {
    res
      .status(400)
      .send(response(STATUS_CODE[400], RESPONSE_MESSAGE.CREATE_FAILED, {}));
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${routes.USER_SERVICE_URL}/users/login`,
      req.body
    );
    res.send(response.data);
  } catch (e) {
    res
      .status(400)
      .send(response(STATUS_CODE[400], RESPONSE_MESSAGE.LOGIN_FAILURE, {}));
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    const response = await axios.post(
      `${routes.USER_SERVICE_URL}/users/logout`,
      req.body,
      {
        headers: {
          Authorization: req.token,
        },
      }
    );
    deleteRedisCacheKey(req.token);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .send(response(STATUS_CODE[500], RESPONSE_MESSAGE.LOGIN_FAILURE, {}));
  }
});

// router.post("/users/logoutAll", auth, async (req, res) => {
//   try {
//     const response = await axios.post(
//       `${routes.USER_SERVICE_URL}/users/logoutAll`,
//       req.body,
//       {
//         headers: {
//           Authorization: req.token,
//         },
//       }
//     );
//     res.send(response.data);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res
      .status(500)
      .send(
        response(STATUS_CODE[500], RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR, {})
      );
  }
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const response = await axios.patch(
      `${routes.USER_SERVICE_URL}/users/me`,
      req.body,
      {
        headers: {
          Authorization: req.token,
        },
      }
    );
    res.send(response.data);
  } catch (e) {
    res
      .status(400)
      .send(
        response(STATUS_CODE[400], RESPONSE_MESSAGE.UPDATE_USER_FAILURE, {})
      );
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    deleteRedisCacheKey(req.token);
    const response = await axios.delete(`${routes.USER_SERVICE_URL}/users/me`, {
      headers: {
        Authorization: req.token,
      },
    });
    //
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .send(
        response(STATUS_CODE[500], RESPONSE_MESSAGE.DELETE_USER_FAILURE, {})
      );
  }
});

module.exports = router;

/*
NOTE: There are 2 authentication: 1) API-GATEWAY   2) User Service
*/
