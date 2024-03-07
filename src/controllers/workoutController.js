let workoutController = {
  async saveWorkout(req, res) {
    const body = req.body;
    console.log(body);
    res.send(201, { data: "Workout saved", status: 201, workoutDetails: body });
  },
};

module.exports = workoutController;
