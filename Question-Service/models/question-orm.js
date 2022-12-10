const mongoose = require("mongoose");

const questionSchema = require("./question-model");

questionSchema.statics.filterQuestion = async (difficulty) => {
  const question = await Question.find({
    questionDifficulty: difficulty,
  }).exec();
  return question;
};

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
