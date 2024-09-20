const {getBooks} = require('../controllers/bookController');
const express = require('express');
const router = express.Router();

router.get('/', getBooks);

module.exports = router;