const express = require("express");
const app = express();
const authRouter = express.Router();
const { signup } = require("../controllers/authController");

authRouter.route("/signup").post(signup);

module.exports = authRouter;
