const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  productId: Number,
  name: String,
  category: String,
  details: String,
  avgScore: Number
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
