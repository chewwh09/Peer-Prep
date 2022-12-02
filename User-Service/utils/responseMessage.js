const responseMessage = {
  CREATE_SUCCESS: "User has successfully been created an account.",
  CREATE_FAILED: "User are unable to register for an account.",

  LOGIN_SUCCESS: "User has successfully login.",
  LOGIN_FAILURE: "User has failed to login.",

  LOGOUT_SUCCESS: "User has successfully logout.",
  LOGOUT_FAILURE: "User has failed to logout.",
  LOGOUT_ALL_SUCCESS: "User has logout all users in the account.",
  LOGOUT_ALL_FAILURE: "User has failed to logout all users.",

  READ_USER_PROFILE: "User has successfully retrieve his profile",

  UPDATE_USER_SUCCESS: "User has successfully update his user profile.",
  UPDATE_USER_FAILURE: "User has failed to update his user profile.",

  DELETE_USER_SUCCESS: "User has successfully deleted his account.",
  DELETE_USER_FAILURE: "User has failed to delete his account.",

  UNATHENTICATED: "Please authenticate.",
};

module.exports = responseMessage;
