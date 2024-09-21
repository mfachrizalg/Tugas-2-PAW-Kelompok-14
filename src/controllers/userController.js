// /controllers/userController.js
exports.getAdminContent = (req, res) => {
  res.json({ message: "Welcome Admin!" });
};

exports.getUserContent = (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
};
