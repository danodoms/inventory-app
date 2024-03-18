const Product = require("../models/product");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [category] = await Promise.all([Category.find({}).exec()]);

  res.render("category_list", {
    title: "Categories",
    categories: category,
  });
});
