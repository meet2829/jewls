const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/products", productController.addProduct);     // Add product
router.get("/products", productController.getAllProducts);  // Fetch all products

module.exports = router;