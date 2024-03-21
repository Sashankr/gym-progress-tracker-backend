const mongoose = require("mongoose");

const { MONGO_DB_URL, MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env;
exports.connectToDb = () => {
  // Construct the MongoDB connection URL with credentials
  const connectionString = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_URL}`;
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
