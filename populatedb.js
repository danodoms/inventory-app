#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const Category = require("./models/category");

const products = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createProducts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate(index, name, description, category, price, stock) {
  const product = new Product({
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  });
  await product.save();
  products[index] = product;
  console.log(`Added product: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Electronics and Gadgets",
      "This category includes cutting-edge electronic devices like smartphones, laptops, cameras, and accessories, catering to tech-savvy consumers seeking the latest innovations in digital technology."
    ),
    categoryCreate(
      1,
      "Fashion and Apparel",
      "Fashion and apparel encompass a wide range of clothing, footwear, and accessories, appealing to fashion-conscious shoppers looking for stylish and trendy attire for various occasions."
    ),
    categoryCreate(
      2,
      "Home and Kitchen Appliances",
      "This category offers a variety of household essentials such as furniture, home decor items, kitchen appliances, and gadgets designed to enhance comfort, convenience, and functionality within homes."
    ),
    categoryCreate(
      3,
      "Health and Beauty",
      "Health and beauty products include cosmetics, skincare items, haircare products, and supplements, addressing consumers' desire for self-care, grooming, and overall well-being."
    ),
    categoryCreate(
      4,
      "Books and Media",
      "This category features physical and digital media products like books, e-books, DVDs, Blu-rays, and music, catering to avid readers, movie enthusiasts, and music lovers seeking entertainment and knowledge."
    ),
  ]);
}

async function createProducts() {
  console.log("Adding products");
  await Promise.all([productCreate(0)]);
}

async function createProducts() {
  console.log("Adding products");
  await Promise.all([
    // Electronics and Gadgets
    productCreate(
      0,
      "Smartphone X",
      "A cutting-edge smartphone with advanced features and performance.",
      [categories[0]],
      799.99,
      100
    ),
    productCreate(
      1,
      "Wireless Earbuds",
      "High-quality wireless earbuds offering superior sound and comfort.",
      [categories[0]],
      129.99,
      200
    ),

    // Fashion and Apparel
    productCreate(
      2,
      "Men's Casual Shirt",
      "A stylish and comfortable shirt for casual outings.",
      [categories[1]],
      39.99,
      150
    ),
    productCreate(
      3,
      "Women's Sneakers",
      "Trendy and fashionable sneakers for active lifestyles.",
      [categories[1]],
      59.99,
      120
    ),

    // Home and Kitchen Appliances
    productCreate(
      4,
      "Smart Coffee Maker",
      "An intelligent coffee maker that brews perfect coffee every time.",
      [categories[2]],
      149.99,
      80
    ),
    productCreate(
      5,
      "Decorative Throw Pillows",
      "Stylish throw pillows to enhance the decor of your living space.",
      [categories[2]],
      29.99,
      100
    ),

    // Health and Beauty
    productCreate(
      6,
      "Anti-Aging Serum",
      "A rejuvenating serum that helps reduce signs of aging and promote youthful skin.",
      [categories[3]],
      49.99,
      50
    ),
    productCreate(
      7,
      "Organic Shampoo",
      "Gentle and nourishing shampoo made with organic ingredients for healthy hair.",
      [categories[3]],
      19.99,
      80
    ),

    // Books and Media
    productCreate(
      8,
      "Bestseller Novel",
      "A captivating novel that keeps readers engaged till the last page.",
      [categories[4]],
      14.99,
      200
    ),
    productCreate(
      9,
      "Classic Vinyl Record",
      "Iconic vinyl record featuring timeless music from legendary artists.",
      [categories[4]],
      24.99,
      50
    ),
  ]);
}
