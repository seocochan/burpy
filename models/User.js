const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  Id: String,
  name: String,
  provider: String,
  wishlist: [
    {
      productId: { type: Number, ref: 'products' },
      date: { type: Date, default: Date.now() }
    }
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
  birthday: { type: String, default: null },
  gender: { type: String, default: null },
  points: { type: Number, default: 0 },
  reviewedProducts: { type: [Number], default: [] }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
