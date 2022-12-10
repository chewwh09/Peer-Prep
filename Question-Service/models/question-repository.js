const Question = require("./question-orm");

const getRandomQuestion = async (difficulty) => {
  const filteredQuestions = await Question.filterQuestion(difficulty);
  const numOfFilteredQuestions = filteredQuestions.length;
  return filteredQuestions[
    Math.floor(Math.random() * numOfFilteredQuestions).toString()
  ];
};

module.exports = { getRandomQuestion };
