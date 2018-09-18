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
  reviewedProducts: {
    '맥주': { type: [Number], default: [] },
    '탄산 음료': { type: [Number], default: [] },
    '커피': { type: [Number], default: [] },
    '위스키': { type: [Number], default: [] },
    '기타 음료': { type: [Number], default: [] },
    '기타 주류': { type: [Number], default: [] }
  },
  imageUploadCount: { type: Number, default: 0 }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
