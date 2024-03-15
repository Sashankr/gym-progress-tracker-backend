const express = require("express");
const UserController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", UserController.signup);

module.exports = router;
