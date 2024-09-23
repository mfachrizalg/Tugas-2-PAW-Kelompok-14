const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authorize");

router
  .route("/")
  .get(
    authenticateToken,
    authorizeRoles("user", "admin"),
    listController.getAllList
  )
  .post(
    authenticateToken,
    authorizeRoles("user", "admin"),
    listController.postList
  )
  .patch(
    authenticateToken,
    authorizeRoles("user", "admin"),
    listController.updateList
  )
  .delete(
    authenticateToken,
    authorizeRoles("user", "admin"),
    listController.deleteList
  );

router.route("/")
    .get(listController.getAllList)
    .post(listController.postList)
    .patch(listController.updateList)
    .delete(listController.deleteList)

router.route("/:listId/books")
    .post(listController.addBookToList)
    .delete(listController.deleteBookFromList)

module.exports = router;