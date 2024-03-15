require("dotenv").config();
const cors = require("cors");
const { connectToDb } = require("./src/config/database");
connectToDb();

const express = require("express");
const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://gym-progress-tracker.vercel.app"],
  optionsSuccessStatus: 200, // for some legacy browsers
};

app.use(cors());

const PORT = process.env.PORT || 3000;

const workoutRoutes = require("./src/routes/workout");
const authRoutes = require("./src/routes/auth");

app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/user", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
