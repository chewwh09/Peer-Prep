const STATUS_CODE = {
  200: "200 OK",
  201: "201 Created",
  202: "202 Accepted",
  400: "400 Bad Request",
  401: "401 Unauthorized",
  403: "403 Forbidden",
  405: "405 Method Now Allowed",
  500: "500 Internal Server Error",
  501: "501 Not Implemented",
  502: "502 Bad Gateway",
};

const RESPONSE_MESSAGE = {
  CREATE_SUCCESS: "User history has successfully been created.",
  CREATE_FAILED: "User history has failed to created.",

  READ_USER_HISTORIES_SUCESS: "User history has been successfully retrieved.",
  READ_USER_HISTORIES_FAILED: "User history has failed to be retrieved.",
};

module.exports = { STATUS_CODE, RESPONSE_MESSAGE };
