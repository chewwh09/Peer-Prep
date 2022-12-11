const History = require("./history-orm");

const saveUserHistory = async (historyData) => {
  const userHistory = new History(historyData);
  await userHistory.save();
  return userHistory;
};

const getUserHistory = async (username) => {
  const userHistories = await History.findUserHistory(username);
  return userHistories;
};

module.exports = { getUserHistory, saveUserHistory };
