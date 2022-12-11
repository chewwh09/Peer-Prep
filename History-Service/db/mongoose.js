const mongoose = require("mongoose");

const config = require("../config/config");

mongoose.connect(config.DB_LOCAL_URI, {
  useNewUrlParser: true,
});

// /Users/Admin/mongodb/bin/mongod.exe --dbpath=/Users/Admin/mongodb-data

// C:\Program Files\apache-activemq-5.17.3\bin\win64
