let workoutController = {
  async saveWorkout(req, res) {
    const body = req.body;
    console.log(body);
    res.send({ data: "Workout saved" });
  },
};

module.exports = workoutController;
