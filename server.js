require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const workoutRoutes = require("./src/routes/workout");

app.use("/api/v1/workout", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
