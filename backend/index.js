const { connectDB } = require("./src/configs/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
    credentials: true,
  })
);

app.use("/book", require("./src/routers/bookRouter"));
app.use("/feedback", require("./src/routers/feedbackRouter"));
app.use("/list", require("./src/routers/listRouter"));
// Anggito
app.use("/api/auth", require("./src/routers/authRouter"));
app.use("/api/admin", require("./src/routers/adminRoutes"));
app.use("/api/user", require("./src/routers/userRouter"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
