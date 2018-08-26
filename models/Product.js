const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  category: String,
  shops: { type: [String], default: [] },
  details: String,
  avgScore: { type: Number, default: 0 },
  avgTaste: { type: [Number], default: [0, 0, 0, 0, 0] },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
  reviewCount: { type: [Number], default: [0, 0, 0, 0, 0] },
  imageUrl: String
});

productSchema.plugin(autoIncrement.plugin, 'products');

const Product = mongoose.model('products', productSchema);
module.exports = Product;
