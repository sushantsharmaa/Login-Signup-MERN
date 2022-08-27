const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const PORT = 5000;
dotenv.config();

const authRouter = require("./routers/authRouter");

app.use(express.json());
app.use("/auth", authRouter);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rmptetq.mongodb.net/foodApp?retryWrites=true&w=majority`,
  () => {
    console.log("Connected to the database.");
  }
);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
