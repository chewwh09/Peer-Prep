const config = {
  DB_LOCAL_URI:
    process.env.DB_LOCAL_URI || "mongodb://localhost:27017/peerPrep",
  SECRET_TOKEN: process.env.SECRET_TOKEN || "your-very-secretive-key",
};

module.exports = config;
