const User = require("../models/userModel");

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
