const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    const sortReview = req.order ? req.order : 'dateAdded'
    User.findById(req.user._id)
      .populate({
        path: 'reviews',
        populate: { path: 'productId' }
      })
      .sort(sortReview)
      .exec((err, doc) => {
        res.send(doc.reviews);
      });
  },

  async addReview(req, res) {
    const userId = req.user._id;
    const values = { userId, ...req.body };

    const newReview = await new Review(values).save();
    res.send(newReview);
  },

  updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;

    Review.findByIdAndUpdate(id, body, { new: true }).exec((err, doc) => {
      res.send(doc);
    });
  },

  removeReview(req, res) {
    const { id } = req.params;

    Review.findOne({ _id: id }, (err, doc) => {
      doc.remove(err => {
        if (err) {
          console.warn(err);
          res.status(410).send('리뷰 제거 실패');
        }
        res.status(200).send(id);
      });
    });
  },

  fetchOneReview(req, res) {
    const { id } = req.params;

    Review.findById(id).exec((err, doc) => {
      res.send(doc);
    });
  },

  fetchMyReview(req, res) {
    const productId = req.params.id;
    const userId = req.user._id;

    Review.findOne({ userId, productId })
      .populate('userId')
      .exec((err, doc) => {
        if (err) {
          res.status(404).send('조회 실패');
        }
        res.status(200).send(doc);
      });
  },

  fetchProductReviews(req, res) {
    const productId = req.params.id;
    const userId = req.user._id;

    // FIX: dateAdded 순으로 정렬
    Review.find({ productId, userId: { $ne: userId } })
      .populate('userId')
      .exec((err, doc) => {
        if (err) {
          res.status(404).send('조회 실패');
        }
        res.status(200).send(doc);
      });
  }
};
