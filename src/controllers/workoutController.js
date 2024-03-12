const WorkoutModel = require("../models/workoutModel");

let workoutController = {
  async saveWorkout(req, res) {
    const body = req.body;
    if (!body.bodyWeight) {
      return res.send(500, {
        data: "Body weight is required",
        status: 500,
        workoutDetails: body,
      });
    }
    if (!body.workoutDetails) {
      return res.send(500, {
        data: "Workout details are required",
        status: 500,
        workoutDetails: body,
      });
    }
    const workout = await WorkoutModel.create(body);

    res.send(201, {
      data: "Workout saved",
      status: 201,
      workoutDetails: workout,
    });
  },
};

module.exports = workoutController;
