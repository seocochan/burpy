const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  productId: { type: Number, ref: 'products' },
  score: { type: Number, required: true },
  content: String,
  dateAdded: { type: Date, default: Date.now() }
});

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

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;
