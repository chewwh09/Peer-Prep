const config = {
  DB_LOCAL_URI:
    process.env.DB_LOCAL_URI || "mongodb://localhost:27017/peerPrep",
};

module.exports = config;
