const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
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

module.exports = historySchema;
