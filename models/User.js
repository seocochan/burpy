const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  Id: String,
  credits: { type: Number, default: 0 },
  name : String,
  provider : String,
  wishlist: [
    {
      productId: { type: Number, ref: 'products' },
      date: { type: Date, default: Date.now() }
    }
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
  birthday : {type : Number, default : null},
  gender : {type : String, default : null}
});

const User = mongoose.model('users', userSchema);
module.exports = User;
