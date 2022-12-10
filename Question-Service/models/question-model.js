const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    unique: true,
  },
  questionDifficulty: {
    type: String,
    required: true,
  },
  questionTitle: {
    type: String,
    required: true,
  },
  questionContent: {
    type: String,
    required: true,
  },
});

module.exports = questionSchema;
