const User = require("../models/User");
const Book = require("../models/Book");

// menambahkan buku yang ada di db buku ke dalam database bookmark
exports.addBookmark = async (req, res) => {
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
    user.bookmarks.push(book._id);
    await user.save();
    res.status(201).json({ message: "Bookmarked successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getAllBookmark = async (req, res) => { 
  try {
    const {bookmarks} = await User.findById(req.user.id).populate("bookmarks").select("bookmarks -_id").lean();
    res.status(200).json(bookmarks);
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}

exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).select("-__v").lean();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await User.findByIdAndUpdate (
      req.user.id,
      { $pull: { bookmarks: id } },
      { new: true }
    );
    res.status(200).json({ message: "Bookmark deleted successfully" });
  }
  catch (error) {
    res.status(500).json(error.message);
  }
}