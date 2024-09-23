const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");


router.route("/")
    .get(listController.getAllList)
    .post(listController.postList)
    .patch(listController.updateList)
    .delete(listController.deleteList)

module.exports = router;