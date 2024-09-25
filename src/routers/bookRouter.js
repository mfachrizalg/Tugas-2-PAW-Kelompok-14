const {getBooks, getAllBooks} = require('../controllers/bookController');
const express = require('express');
const router = express.Router();

router.get('/', getBooks);
router.get('/all', getAllBooks);

module.exports = router;