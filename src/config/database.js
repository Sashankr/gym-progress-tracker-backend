const mongoose = require("mongoose");

const { MONGO_URL } = process.env;
exports.connectToDb = () => {
  // Construct the MongoDB connection URL with credentials
  const connectionString = MONGO_URL;
  console.log(connectionString);
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
