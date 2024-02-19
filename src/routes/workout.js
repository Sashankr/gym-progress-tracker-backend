const express = require("express");

const router = express.Router();

router.post("/save-workout", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send({ data: "Workout saved" });
});

module.exports = router;
