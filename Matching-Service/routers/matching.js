const express = require("express");

const { deleteMatchRecord } = require("../models/matching-repository");

const router = new express.Router();

router.delete("/matching", async (req, res) => {
  try {
    const data = await deleteMatchRecord(req.body);
    res.send(data);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
