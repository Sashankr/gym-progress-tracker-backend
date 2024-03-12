const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  bodyWeight: {
    type: Number,
    required: true,
  },
  workoutDetails: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const workout = new mongoose.model("Workout", WorkoutSchema);
module.exports = workout;
