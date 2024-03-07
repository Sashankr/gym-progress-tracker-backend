const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.post("/save-workout", controllers.workoutController.saveWorkout);

module.exports = router;
