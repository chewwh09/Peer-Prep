const Matching = require("./matching-orm");

const matchUsers = async ({ username, difficulty, roomId }) => {
  try {
    const { match, error } = await Matching.findMatchingRoom(difficulty);
    console.log(match, error);
    if (error) {
      const newRecord = new Matching({
        roomId,
        usernameOne: username,
        usernameTwo: "",
        difficulty,
      });
      await newRecord.save();

      return newRecord;
    }

    match.usernameTwo = username;
    return match;
  } catch (e) {
    console.log("Matching users function throws an error", e);
  }
};

const deleteMatchRecord = async ({ roomId, username }) => {
  try {
    const { match, error } = await Matching.deleteRoomByRoomIdAndName(
      roomId,
      username
    );
    if (error) return error;

    return match;
  } catch (e) {
    console.log("Delete match record function throws an error", e);
  }
};

module.exports = { matchUsers, deleteMatchRecord };
