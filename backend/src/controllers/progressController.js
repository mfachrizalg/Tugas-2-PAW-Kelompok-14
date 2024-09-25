const Progress = require("../models/Progress");
const User = require("../models/User");
const Book = require("../models/Book");
const mongoose = require("mongoose");

// const getAllProgress = async (req, res) => {
//   let byId = req.user.id;
//   let title = req.query.title;
//   //   if (!title) return res.status(400).json({ message: "Title is required" });
//   //   title = title.replace(" ", "+");
//   try {
//     const { data } = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${title}`
//     );
//     if (data.totalItems === 0)
//       return res.status(404).json({ message: "Books not found" });

//     const bulkOperations = data.items.map((book) => {
//       return {
//         updateOne: {
//           filter: { _id: book.id },
//           update: {
//             $set: {
//               title: book.volumeInfo.title || " ",
//               authors: book.volumeInfo.authors || [" "],
//               publisher: book.volumeInfo.publisher || " ",
//               publishedDate: book.volumeInfo.publishedDate || " ",
//               description: book.volumeInfo.description || " ",
//               image:
//                 book.volumeInfo.imageLinks?.thumbnail ||
//                 "http://books.google.com/books/content?id=rbQ4MAEACAAJ&printsec=frontcover&img=1&zoom=3&source=gbs_api",
//               page: book.volumeInfo.pageCount || 0,
//             },
//           },
//           upsert: true,
//         },
//       };
//     });

//     const upsertBook = Book.bulkWrite(bulkOperations);
//     if (!upsertBook)
//       return res.status(400).json({ message: "Failed to add books" });

//     // Retrieve the updated/inserted books from the database
//     const updatedBooks = await Book.find({
//       _id: { $in: data.items.map((book) => book.id) },
//     });

//     res.status(200).send(updatedBooks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// logic to get book progress
const getAllProgress = async (req, res) => {
  const id = req.user.id;
  try {
    // const user = await Progress.find({ userId: id }).populate("progressId");
    const user = await User.findById(req.user.id).populate("progressId");
    console.log("UserID:", id);
    console.log("User progress:", user.progressId);
    res.status(200).json(user.progressId);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// const getAllProgress = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("progressId");

//     if (!user || !user.progressId) {
//       return res.status(404).json({ message: "User or progress not found" });
//     }

//     console.log("User progress:", user.progressId);

//     const finished = user.progressId.filter(
//       (progress) => progress.status === "Finished"
//     );
//     const reading = user.progressId.filter(
//       (progress) => progress.status === "Reading"
//     );

//     console.log("Filtered Finished:", finished);
//     console.log("Filtered Reading:", reading);

//     res.status(200).json({ finished, reading });
//   } catch (error) {
//     console.error("Error in getAllProgress:", error.message);
//     res.status(500).json(error.message);
//   }
// };

// logic to add progress
const addProgress = async (req, res) => {
  let session, status;
  const { bookId } = req.params;
  const { page } = req.body;
  try {
    [user, session, book] = await Promise.all([
      User.findById(req.user.id),
      mongoose.startSession(),
      Book.findById(bookId),
    ]);
    if (!book) return res.status(404).json("Book not found");
    session.startTransaction();
    if (page > book.page)
      return res.status(400).json("Page exceeds total page");
    if (page < 0) return res.status(400).json("Page must be positive");
    page === book.page ? (status = "Finished") : (status = "Reading");
    const newProgress = new Progress({
      userId: user._id,
      bookId,
      page,
      status,
    });

    // const newProgress = new Progress(
    //   { userId: user._id },
    //   { bookId, page, status },
    //   { new: true, session, upsert: true }
    // );
    //
    await newProgress.save({ session });
    console.log("Progress saved:", newProgress);

    if (!user.progressId.includes(newProgress._id))
      user.progressId.push(newProgress._id);
    await user.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Progress added successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json(error.message);
  } finally {
    if (session) session.endSession();
  }
};

module.exports = {
  getAllProgress,
  addProgress,
};
