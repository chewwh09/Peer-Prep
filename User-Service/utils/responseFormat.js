const responseFormat = ({ statusCode, message, data }) => {
  return {
    Status_Code: statusCode,
    Message: message,
    Data: data,
  };
};

module.exports = responseFormat;
