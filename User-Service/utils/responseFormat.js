const responseFormat = (statusCode, message, data) => {
  return {
    status_code: statusCode,
    message,
    data,
  };
};

module.exports = responseFormat;
