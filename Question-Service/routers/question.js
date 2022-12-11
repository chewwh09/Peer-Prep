const express = require("express");
const { PythonShell } = require("python-shell");

const { getRandomQuestion } = require("../models/question-repository");
const config = require("../config/config");

const router = new express.Router();

router.get("/questions/getLeetcodeQuestions", (req, res, next) => {
  try {
    const uri = config.DB_LOCAL_URI;
    const pyshell = new PythonShell("./utils/leetcode_scrapper.py", {
      mode: "text",
      args: [uri],
    });
    pyshell.on("message", (message) => {
      console.log(message);
    });

    pyshell.end((err) => {
      if (err) {
        throw err;
      }
    });

    return res.status(200).json({ message: "Fetched successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/questions/getQuestion/:difficulty", async (req, res) => {
  try {
    const difficultyStr = req.params.difficulty;
    if (!difficultyStr) throw new Error();

    const capitalizeString =
      difficultyStr.charAt(0).toUpperCase() + difficultyStr.slice(1);
    const question = await getRandomQuestion(capitalizeString);
    res.send(question);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
