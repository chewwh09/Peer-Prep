const mongoose = require("mongoose");

const historySchema = require("./history-model");

historySchema.statics.findUserHistory = async (username) => {
  const userHistories = await History.find({ username }).exec();
  return userHistories;
};

const History = mongoose.model("History", historySchema);

module.exports = History;
