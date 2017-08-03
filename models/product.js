const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  chain: String,
  upc: String,
  sku: String,
  name: {
    type: String,
    required: true
  },
  department: String,
  images: {
    thumbnailUrl: String,
    largeUrl: String
  },
  url: String
  /**
   * More information will be included in real database
   */
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
