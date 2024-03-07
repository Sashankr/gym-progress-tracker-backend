let workoutController = {
  async saveWorkout(req, res) {
    const body = req.body;
    console.log(body);
    res.send(201, { data: "Workout saved" });
  },
};

module.exports = workoutController;
