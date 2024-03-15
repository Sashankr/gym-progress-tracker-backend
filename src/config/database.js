const mongoose = require("mongoose");

const { MONGO_DB_URL } = process.env;

exports.connectToDb = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};