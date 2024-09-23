const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authorize");

router
  .route("/")
  .get(
    authenticateToken,
    authorizeRoles("user"),
    listController.getAllList
  )
  .post(
    authenticateToken,
    authorizeRoles("user"),
    listController.addList
  )
  .delete(
    authenticateToken,
    authorizeRoles("user"),
    listController.deleteBookFromList
  );

router
  .route("/:id")
  .post(
    authenticateToken,
    authorizeRoles("user"),
    listController.addBookToList
  )
  .patch(
    authenticateToken,
    authorizeRoles("user"),
    listController.updateList
  )
  .delete(
    authenticateToken,
    authorizeRoles("user"),
    listController.deleteList
  );

module.exports = router;