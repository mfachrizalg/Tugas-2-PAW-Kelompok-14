const { connectDB } = require("./src/configs/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
connectDB();
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
    credentials: true,
  })
);
app.use("/auth", require("./src/routers/authRouter"));
app.use("/book", require("./src/routers/bookRouter"));
app.use("/feedback", require("./src/routers/feedbackRouter"));
app.use("/list", require("./src/routers/listRouter"));
app.use("/progress", require("./src/routers/progressRouter"));
app.use("/user", require("./src/routers/userRouter"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
