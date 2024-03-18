const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");

//PRODUCT ROUTES
// GET home page.
router.get("/", product_controller.index);

router.get("/products", product_controller.product_list);

module.exports = router;
