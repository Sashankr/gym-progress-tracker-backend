const WorkoutModel = require("../models/workoutModel");
const UserModel = require("../models/userModel");
const moment = require("moment");

let workoutController = {
  async saveWorkout(req, res) {
    const userId = req.user.user_id;
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
    const formattedDate = moment(new Date(), "YYYY-MM-DD")
      .startOf("day")
      .toDate();

    // Calculate the start and end of the day for the formatted date
    const startOfDay = moment(formattedDate).toDate();
    const endOfDay = moment(formattedDate).endOf("day").toDate();

    // Check if a workout with the same date already exists
    const existingWorkout = await WorkoutModel.findOne({
      userId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (existingWorkout) {
      return res
        .status(409)
        .json({ message: "Workout with the same date already exists" });
    }

    if (existingWorkout) {
      return res
        .status(409)
        .send({ message: "Workout with the same date already exists" });
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
    const { page, limit, date } = req.query;

    const actualPage = page - 1;
    console.log(userId);
    const isValidUser = await UserModel.findOne({ _id: userId });
    if (!isValidUser) {
      return res.status(400).send({
        message: "Invalid User",
      });
    }
    const createdDate = moment(date, "DD-MM-YYYY").utc().toISOString();

    console.log({
      1: createdDate,
      2: moment(createdDate).add(1, "day").toISOString(),
    });

    const totalWorkouts = await WorkoutModel.findOne({
      userId,
      createdAt: {
        $gte: createdDate,
        $lt: moment(createdDate).add(1, "day").toISOString(),
      },
    });
    const count = totalWorkouts.length;
    const workouts = await WorkoutModel.find({
      userId,
      createdAt: {
        $gte: createdDate,
        $lt: moment(createdDate).add(1, "day").toISOString(),
      },
    })
      .skip(limit * actualPage)
      .limit(limit);
    if (workouts.length === 0) {
      return res.status(200).send({
        message: "No Workouts Found",
        data: workouts,
        totalCount: count,
        currentPageCount: workouts.length,
        status: 200,
      });
    } else {
      return res.status(200).send({
        message: "Workouts Found",
        data: workouts,
        totalCount: count,
        currentPageCount: workouts.length,
        status: 200,
      });
    }
  },
};

module.exports = workoutController;
