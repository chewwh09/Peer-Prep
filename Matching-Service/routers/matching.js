const express = require("express");

const {
  matchUsers,
  deleteMatchRecord,
} = require("../models/matching-repository");

const router = new express.Router();

router.post("/matching", async (req, res) => {
  try {
    const data = await matchUsers(req.body);
    res.send(data);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/matching", async (req, res) => {
  try {
    const data = await deleteMatchRecord(req.body);
    res.send(data);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
