// /controllers/userController.js
const User = require("../models/User"); // Import the User model

// Controller to get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    // Ensure the request is coming from an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only." });
    }

    // Fetch all users from the database
    const users = await User.find({}, "-password"); // Exclude the password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// menambahkan buku yang ada di db buku ke dalam database bookmark
const addBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const book = await Book.findById(id).select("-__v").lean();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const isBookmarked = user.bookmarks.some((bookmark) => bookmark.id === id);
    if (isBookmarked) {
      return res.status(400).json({ message: "Book already bookmarked" });
    }
    user.bookmarks.push(book);
    await user.save();
    res.status(201).json({ message: "Bookmarked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllUsers, addBookmark };

exports.getUserContent = (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
};
