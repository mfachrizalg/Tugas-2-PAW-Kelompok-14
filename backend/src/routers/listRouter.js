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

module.exports = router;
