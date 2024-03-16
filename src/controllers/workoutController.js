const WorkoutModel = require("../models/workoutModel");
const UserModel = require("../models/userModel");

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
  async getWorkouts(req, res) {
    const userId = req.user.user_id;
    const { page, limit } = req.query;
    const actualPage = page - 1;
    console.log(userId);
    const isValidUser = await UserModel.findOne({ _id: userId });
    if (!isValidUser) {
      return res.status(400).send({
        message: "Invalid User",
      });
    }
    const totalWorkouts = await WorkoutModel.find({ userId });
    const count = totalWorkouts.length;
    const workouts = await WorkoutModel.find({ userId })
      .skip(limit * actualPage)
      .limit(limit);
    if (workouts.length === 0) {
      return res.status(200).send({
        message: "No Workouts Found",
        data: workouts,
        totalCount: count,
        currentPageCount: workouts.length,
      });
    } else {
      return res.status(200).send({
        message: "Workouts Found",
        data: workouts,
        totalCount: count,
        currentPageCount: workouts.length,
      });
    }
  },
};

module.exports = workoutController;
