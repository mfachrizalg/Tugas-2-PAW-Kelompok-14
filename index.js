const {connectDB} = require("./src/configs/db");
const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
if (connectDB) {
  console.log("MongoDB Connected");
  const PORT = 3500;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
    console.log("MongoDB Connection Failed");
}