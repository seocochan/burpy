const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');

module.exports = {
  fetchWishlist(req, res) {
    // req로 온 객체의 productId들을 통해
    // db에서 각 상품의 정보를 조회하고
    // res로 반환
    console.log('get wishlist');
  },

  deleteWishlistItem(req, res) {
    const userId = req.user._id;
    const productId = req.params.id;

    User.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: { productId: { $in: productId } } }
      },
      { new: true }
    ).then((doc, err) => {
      if (err) {
        console.warn(err);
        console.log(JSON.stringify(doc));
      }
      res.send(doc);
    });
  }
};
