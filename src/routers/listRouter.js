const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");


router.route("/")
    .get(listController.getAllList)
    .post(listController.postList)
    .patch(listController.updateList)
    .delete(listController.deleteList)

router.route("/:listId/books")
    .post(listController.addBookToList)
    .delete(listController.deleteBookFromList)

module.exports = router;