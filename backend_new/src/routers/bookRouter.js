const { getBooks, getBookById } = require("../controllers/bookController");
const express = require("express");
const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById); // Rute untuk mendapatkan buku berdasarkan ID

module.exports = router;
