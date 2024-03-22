require("dotenv").config();
const cors = require("cors");
const { connectToDb } = require("./src/config/database");
const helmet = require("helmet");
connectToDb();

const express = require("express");
const app = express();
app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
      allowedOrigins: [
        "https://gym-progress-tracker.vercel.app",
        "http://localhost:3000",
      ],
    },
  })
);

const corsOptions = {
  origin: ["http://localhost:3000", "https://gym-progress-tracker.vercel.app"],
  optionsSuccessStatus: 200, // for some legacy browsers
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

const workoutRoutes = require("./src/routes/workout");
const authRoutes = require("./src/routes/auth");

app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/user", authRoutes);

app.listen(PORT, (data) => {
  console.log("data", data);
  console.log(`Server running on port ${PORT}`);
});
