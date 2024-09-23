const {connectDB} = require("./src/configs/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.use('/book', require('./src/routers/bookRouter'))
app.use('/feedback', require('./src/routers/feedbackRouter'))
app.use('/list', require('./src/routers/listRouter'))
app.use('/progress', require('./src/routers/progressRouter'))

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});