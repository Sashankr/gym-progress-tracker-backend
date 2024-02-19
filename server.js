require("dotenv").config();
const cors = require("cors");

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
