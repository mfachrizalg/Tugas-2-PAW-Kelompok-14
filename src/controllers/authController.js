// /controllers/authController.js
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    //GET DATA FROM REQUEST
    const { username, email, password, role } = req.body;
    //CREATE NEW USER
    const user = new User({ username, email, password, role });
    //CONFIRM DATA
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }
    //CHECK DUPLICATE EMAIL
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }
    //HASHING PASSWORD
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    // Check email
    if (!user) {
      return res.status(401).json({ error: "Invalid email (email not found)" });
    }
    // Check password
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 1 hour
    );
    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: false, //ga baik tpi gpp
      secure: true,
      sameSite: "None",
      //batas cookie 1 hour
      maxAge: 1 * 60 * 60 * 1000,
    });
    // Send response
    res.json({
      message: "Login successful",
      token,
      id: user._id,
      username: user.username,
      roles: user.role,
    });
    return token;
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  // Clear cookie
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
