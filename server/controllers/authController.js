const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// Signup User
module.exports.signup = async function signup(req, res) {
  try {
    let data = req.body;
    let user = await User.create(data);
    if (user) {
      res.json({
        message: "Signed up successfully!",
        data: user,
      });
    } else {
      res.json({ message: "Error creating user" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Login User
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await User.findOne({ email: data.email });
      if (user) {
        // bcrypt compare
        const confirmPassword = bcrypt.compareSync(
          data.password,
          user.password
        );
        if (confirmPassword) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("accessToken", token, { httpOnly: true });
          return res.json({
            message: "Logged in successfully!",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Credentials!",
          });
        }
      } else {
        return res.json({
          message: "Invalid username or password!",
        });
      }
    } else {
      return res.json({
        message: "Empty field found!",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
