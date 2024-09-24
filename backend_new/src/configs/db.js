require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}