const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

// This requires the token!
router.get("/", verifyToken, productController.getAllProducts);

module.exports = router;
