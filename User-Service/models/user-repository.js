const User = require("./user-orm");

const registerUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  await user.save();
  const token = await user.generateAuthToken();

  return { user, token };
};

const loginUser = async (email, password) => {
  const user = await User.findByCredentials(email, password);
  const token = await user.generateAuthToken();
  return { user, token };
};

const logoutUser = async (user, currentToken) => {
  user.tokens = user.tokens.filter((token) => token.token !== currentToken);
  await user.save();
  return;
};

const logoutAllUsers = async (user) => {
  user.tokens = [];
  await user.save();
  return;
};

const updateProfile = async (updatesObject, user) => {
  const updates = Object.keys(updatesObject);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return { error: "Invalid updates" };
  }

  updates.forEach((update) => (user[update] = updatesObject[update]));
  await user.save();
  return { user };
};

const deleteUser = async (user) => {
  await user.remove();
  return;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  updateProfile,
  deleteUser,
};
