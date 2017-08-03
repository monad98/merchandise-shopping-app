const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  chain: String,
  name: {
    type: String,
    required: true
  },
  storeNo: Number,
  country: String,
  streetAddress: {
    type: String,
    unique: true,
    required: true
  },
  city: String,
  stateProvCode: String,
  zip: String,
  loc: {
    type: { type: String, default:'Point' },
    coordinates: {type: [Number], index: '2dsphere'}
  },
  phoneNumber: String,
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;

