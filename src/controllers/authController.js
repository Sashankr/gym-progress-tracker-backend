const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const UserController = {
  async signup(req, res, next) {
    try {
      const { fullName, username, emailId, password } = req.body;
      if (!(fullName && username && emailId && password)) {
        return res.send(400, {
          message: "All fields are required",
        });
      }

      try {
        const oldUser = await UserModel.findOne({
          $or: [{ username }, { emailId }],
        });

        if (oldUser) {
          if (oldUser.username === username) {
            return res.status(409).send({
              message: `Username : ${username} already exists`,
            });
          }

          if (oldUser.emailId === emailId) {
            return res.status(409).send({
              message: `Email : ${emailId} already exists`,
            });
          }
        } else {
          const encryptedPassword = await bcrypt.hash(password, 10);
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
        }
      } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
          message: `Something went wrong`,
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
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
      res.send(500, {
        message: "Something went wrong",
        error: err,
      });
    }
  },
  async signin(req, res, next) {
    try {
      const { emailId, password } = req.body;
      if (!(emailId && password)) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }
      let user = await UserModel.findOne({ emailId });
      if (!user) {
        return res.status(500).send({
          message: "Email Id not found",
        });
      }
      const checkIfPasswordSame = await bcrypt.compare(password, user.password);

      if (user && checkIfPasswordSame) {
        const token = JWT.sign(
          { user_id: user._id, emailId },
          process.env.SECRET_KEY,
          { expiresIn: "5h" }
        );
        user.token = token;
        user.password = undefined;
        const updatedUser = {
          user,
          token,
        };
        return res.status(200).send({
          message: "Login Verified",
          status: 200,
          data: updatedUser,
        });
      } else {
        return res.status(400).send({
          message: "Invalid Credentials",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = UserController;
