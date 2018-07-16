const User = require('../models/User');

module.exports = {
  fetchWishlist(req, res) {
    const sortWishlist = req.order ? req.order : 'wishlist.date';
    User.findById(req.user._id)
      .populate('wishlist.productId')
      .sort(sortWishlist)
      .exec((err, doc) => {
        res.send(doc.wishlist);
      });
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
      res.send(doc.wishlist);
    });
  },

  addWishlist(req, res) {
    const userId = req.user._id; //User객채의 ._id를 조회할떄 사용함
    const productId = req.params.id; //url의 id를 받아온다.

    User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          wishlist: {
            productId: productId
          }
        }
      },
      { new: true }
    ).then((doc, err) => {
      if (err) {
        console.warn(err);
      }
      res.send(doc.wishlist);
    });
  },

  fetchMyInfo(req, res) {
    const userId = req.user._id;
    User.findByIdAndUpdate(userId).exec((err, doc) => {
      res.send(doc);
    });
  },

  updateMyInfo(req, res) {
    const { id } = req.params;
    const { body } = req;
    User.findByIdAndUpdate(id, body, { new: true }).exec((err, doc) => {
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
