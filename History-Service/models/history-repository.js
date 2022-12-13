const History = require("./history-orm");

const saveUserHistory = async (
  username,
  questionDifficulty,
  questionTitle,
  questionContent
) => {
  const userHistory = new History({
    username,
    questionDifficulty,
    questionTitle,
    questionContent,
  });
  await userHistory.save();
  return userHistory;
};

const getUserHistory = async (username) => {
  const userHistories = await History.findUserHistory(username);
  return userHistories;
};

module.exports = { getUserHistory, saveUserHistory };
