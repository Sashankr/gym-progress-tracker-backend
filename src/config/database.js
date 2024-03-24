require("dotenv").config();

const mongoose = require("mongoose");

exports.connectToDb = () => {
  // Construct the MongoDB connection URL with credentials
  const connectionString = process.env.MONGO_DB_URL;
  console.log("string mongo", connectionString);
  // Connecting to the database with authentication
  mongoose
    .connect(connectionString, {
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
