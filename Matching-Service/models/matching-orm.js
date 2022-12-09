const mongoose = require("mongoose");

const matchingSchema = require("./matching-model");

matchingSchema.methods.toJSON = function () {
  const match = this;
  const matchObject = match.toObject();

  delete matchObject["__v"];
  delete matchObject._id;

  return matchObject;
};

matchingSchema.pre("save", async function (next) {
  const match = this;
  match.difficulty = match.difficulty.toLowerCase().trim();
  next();
});

matchingSchema.statics.findMatchingRoom = async (difficulty) => {
  const difficultyString = difficulty.toLowerCase().trim();
  const match = await Matching.findOneAndDelete({
    difficulty: difficultyString,
  });
  if (!match) return { error: "No match found" };

  return { match };
};

matchingSchema.statics.deleteRoomByRoomIdAndName = async (roomId, username) => {
  const match = await Matching.findOneAndDelete({
    roomId,
    usernameOne: username,
  });
  if (!match) return { error: "No match to be deleted" };

  return { match };
};

const Matching = mongoose.model("Matching", matchingSchema);

module.exports = Matching;
