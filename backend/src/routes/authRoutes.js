const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware"); // 1. Import middleware

router.post("/register", authController.register);
router.post("/login", authController.login);

const { verifyToken } = require("../middlewares/authMiddleware");
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your protected profile!", user: req.user });
});

module.exports = router;
// Change this temporarily to test connection without security blocks
router.get("/profile", (req, res) => {
  res.json({ message: "Backend is connected!" });
});
