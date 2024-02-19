const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const workoutRoutes = require("./src/routes/saveWorkout");

app.use("/api/v1/workout", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
