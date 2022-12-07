const mongoose = require("mongoose");

const matchingSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unqiue: true,
    required: true,
  },
  usernameOne: {
    type: String,
    required: true,
    trim: true,
  },
  usernameTwo: {
    type: String,
  },
  difficulty: {
    type: String,
    required: true,
    validate(value) {
      const difficultyString = value.toLowerCase().trim();
      if (
        difficultyString !== "easy" &&
        difficultyString !== "medium" &&
        difficultyString !== "hard"
      ) {
        throw new Error("Invalid difficulty type");
      }
    },
  },
});

module.exports = matchingSchema;
