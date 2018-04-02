const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: Schema.Types.ObjectId,
  productId: Number,
  score: { type: Number, required: true },
  content: String,
  dateAdded: { type: Date, default: Date.now()}
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;
