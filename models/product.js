const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, required: true, ref: "Category" }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

ProductSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/product/${this._id}`;
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);
