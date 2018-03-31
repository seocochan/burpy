const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  category: String,
  details: String,
  avgScore: { type: Number, default: 0 }
});

productSchema.plugin(autoIncrement.plugin, 'products');

const Product = mongoose.model('products', productSchema);
module.exports = Product;
