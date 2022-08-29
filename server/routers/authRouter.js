const express = require("express");
const app = express();
const authRouter = express.Router();
const { signup, login } = require("../controllers/authController");

authRouter.route("/signup").post(signup);

authRouter.route("/login").post(login);

module.exports = authRouter;
