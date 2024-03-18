const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");
const category_controller = require("../controllers/categoryController");

//PRODUCT ROUTES
// GET home page.
router.get("/", product_controller.index);

router.get("/products", product_controller.product_list);

//CATEGORY ROUTES
router.get("/categories", category_controller.category_list);

module.exports = router;
