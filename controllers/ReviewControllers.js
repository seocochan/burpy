const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    const sortReview = req.order ? req.order : 'dateAdded';
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
    const avgScore = await fetchScore(newReview.productId);
    const productScore = await fetchProduct(newReview.productId, avgScore);
    res.send(productScore);
  },

  async updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatedReview = await Review.findByIdAndUpdate(id, body, {
      new: true
    });
    const avgScore = await fetchScore(updatedReview.productId);
    const productScore = await fetchProduct(updatedReview.productId, avgScore);
    res.send(productScore);
  },

  removeReview(req, res) {
    const { id } = req.params;

    Review.findOne({ _id: id }, (err, doc) => {
      doc.remove(async err => {
        if (err) {
          console.warn(err);
          res.status(410).send('리뷰 제거 실패');
        }
        //res.status(200).send(id);
        const Avg = await fetchScore(doc.productId);
        const productScore = await fetchProduct(doc.productId, Avg);
        res.send(productScore);
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

const fetchScore = Id =>
  new Promise(resolve => {
    Review.aggregate([
      { $match: { productId: Id } },
      {
        $group: {
          _id: '',
          scoreavg: { $avg: '$score' }
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        console.log('doc', doc);
        if (doc.length == 0) {
          resolve('0');
        } else {
          resolve(doc[0].scoreavg);
        }
      }
    });
  });

const fetchProduct = (Id, score) =>
  new Promise(resolve => {
    Product.findByIdAndUpdate(Id, { avgScore: score }, { new: true }).exec(
      (err, doc) => {
        if (!err) {
          resolve(doc);
        }
      }
    );
  });
