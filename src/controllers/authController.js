const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const UserController = {
  async signup(req, res, next) {
    try {
      const { fullName, username, emailId, password } = req.body;
      console.log("body", req.body);
      if (!(fullName && username && emailId && password)) {
        return res.send(400, {
          message: "All fields are required",
        });
      }
      const oldUser = await UserModel.findOne({ emailId });
      if (oldUser) {
        return res.send(409, {
          message: "This user already exists, please login",
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log(encryptedPassword);
      const user = await UserModel.create({
        fullName,
        username,
        emailId: emailId.toLowerCase(),
        password: encryptedPassword,
      });

      const token = JWT.sign(
        { user_id: user._id, emailId, username },
        process.env.SECRET_KEY,
        { expiresIn: "5h" }
      );
      user.token = token;
      return res.send(201, {
        message: "Signup Successfull!",
        status: 201,
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.send(500, {
        message: "Something went wrong",
      });
    }
  },
};

module.exports = UserController;
