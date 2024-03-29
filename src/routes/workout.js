const express = require("express");
const controllers = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/save-workout", auth, controllers.workoutController.saveWorkout);
router.get("/my-workouts", auth, controllers.workoutController.getWorkouts);

module.exports = router;
