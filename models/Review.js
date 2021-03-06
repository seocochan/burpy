const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');
const Product = require('../models/Product');

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  productId: { type: Number, ref: 'products', required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true },
  taste: [{ type: Number }],
  comment: String,
  dateAdded: { type: Date, default: Date.now() }
});

// 리뷰 save 미들웨어
reviewSchema.pre('save', function(next) {
  this.model('products').update(
    { _id: { $in: this.productId } },
    { $push: { reviews: this._id } },
    { multi: true },
    next
  );

  this.model('users').update(
    { _id: { $in: this.userId } },
    { $push: { reviews: this._id } },
    { multi: true },
    next
  );
});

// 리뷰 remove 미들웨어
reviewSchema.pre('remove', function(next) {
  this.model('products').update(
    { _id: { $in: this.productId } },
    { $pull: { reviews: this._id } },
    { multi: true },
    next
  );

  this.model('users').update(
    { _id: { $in: this.userId } },
    { $pull: { reviews: this._id } },
    { multi: true },
    next
  );
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;
