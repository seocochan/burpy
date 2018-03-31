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
  },

  fetchMyProduct(req, res) {
    // req.user로 유저 찾기
    // reviews 필드 추출
    // populate하여 ref된 review 객체 전체(배열) 가져오기
    console.log('get my product');
  }
};
