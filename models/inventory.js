const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  storeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: true
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    default: null,
    index: true //for requesting all products
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true, //need for searching stores that have specific items
    index: 'text'
  },
  loc: {
    type: { type: String, default:'Point' },
    coordinates: {type: [Number], index: '2dsphere'}
  }

}, {timestamps: true});

const Inventory = mongoose.model("Inventory", inventorySchema);
inventorySchema.index({ storeId: 1, price: 1}); //for single store's product request
module.exports = Inventory;
