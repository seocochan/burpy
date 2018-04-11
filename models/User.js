const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  wishlist: [
    {
      productId: { type: Number, ref: 'products' },
      date: { type: Date, default: Date.now() }
    }
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }]
});

const User = mongoose.model('users', userSchema);
module.exports = User;
