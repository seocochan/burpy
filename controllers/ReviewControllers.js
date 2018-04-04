const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    User.findById(req.user._id)
      .populate({
        path: 'reviews',
        populate: { path: 'productId' }
      })
      .exec((err, doc) => {
        res.send(doc.reviews);
      });
  },

  async addReview(req, res) {
    // 다되면 MyProduct 컴포넌트에서 User.populate로 찍어보기
    const userId = req.user._id;
    const productId = 1; // req.body.product._id
    const score = 4.0; // req.body.score
    const content = '에에에에엥'; // req.body.content

    const newReview = await new Review({
      userId,
      productId,
      score,
      content
    }).save();

    res.send(newReview);
  },

  updateReview(req, res) {
    console.log('update review');
  },

  removeReview(req, res) {
    console.log('remove review');
  }
};
