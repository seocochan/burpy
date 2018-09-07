const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');

module.exports = {
  fetchReviews(req, res) {
    const userId = req.user._id;

    Review.find({ userId: mongoose.Types.ObjectId(userId) })
      .populate('productId')
      .sort({ dateAdded: -1 })
      .exec((err, doc) => {
        if (err) {
          return res.status(500).send({ error: 'DB 에러: ' + err });
        }

        return res.send(doc);
      });
  },

  async addReview(req, res) {
    const userId = req.user._id;
    const values = { userId, ...req.body };

    const newReview = await new Review(values).save();
    const avgScore = await fetchScore(newReview.productId);
    const avgTaste = await fetchTaste(newReview.productId);
    const reviewCount_1 = await fetchScoreCount(newReview.productId, 0, 1);
    const reviewCount_2 = await fetchScoreCount(newReview.productId, 1, 2);
    const reviewCount_3 = await fetchScoreCount(newReview.productId, 2, 3);
    const reviewCount_4 = await fetchScoreCount(newReview.productId, 3, 4);
    const reviewCount_5 = await fetchScoreCount(newReview.productId, 4, 5);
    const count = [
      reviewCount_1[0].count,
      reviewCount_2[0].count,
      reviewCount_3[0].count,
      reviewCount_4[0].count,
      reviewCount_5[0].count
    ];
    console.log(count);
    const taste = [
      avgTaste[0].tasteavg1,
      avgTaste[0].tasteavg2,
      avgTaste[0].tasteavg3,
      avgTaste[0].tasteavg4,
      avgTaste[0].tasteavg5
    ];
    const productScore = await fetchProduct(
      newReview.productId,
      avgScore,
      taste,
      count
    );
    res.send(productScore);
  },

  async updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatedReview = await Review.findByIdAndUpdate(id, body, {
      new: true
    });
    const avgScore = await fetchScore(updatedReview.productId);
    const avgTaste = await fetchTaste(updatedReview.productId);
    const reviewCount_1 = await fetchScoreCount(updatedReview.productId, 0, 1);
    const reviewCount_2 = await fetchScoreCount(updatedReview.productId, 1, 2);
    const reviewCount_3 = await fetchScoreCount(updatedReview.productId, 2, 3);
    const reviewCount_4 = await fetchScoreCount(updatedReview.productId, 3, 4);
    const reviewCount_5 = await fetchScoreCount(updatedReview.productId, 4, 5);
    const count = [
      reviewCount_1[0].count,
      reviewCount_2[0].count,
      reviewCount_3[0].count,
      reviewCount_4[0].count,
      reviewCount_5[0].count
    ];
    const taste = [
      avgTaste[0].tasteavg1,
      avgTaste[0].tasteavg2,
      avgTaste[0].tasteavg3,
      avgTaste[0].tasteavg4,
      avgTaste[0].tasteavg5
    ];
    const productScore = await fetchProduct(
      updatedReview.productId,
      avgScore,
      taste,
      count
    );
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
        const avgTaste = await fetchTaste(doc.productId);
        const reviewCount_1 = await fetchScoreCount(doc.productId, 0, 1);
        const reviewCount_2 = await fetchScoreCount(doc.productId, 1, 2);
        const reviewCount_3 = await fetchScoreCount(doc.productId, 2, 3);
        const reviewCount_4 = await fetchScoreCount(doc.productId, 3, 4);
        const reviewCount_5 = await fetchScoreCount(doc.productId, 4, 5);
        const taste = [
          avgTaste[0].tasteavg1,
          avgTaste[0].tasteavg2,
          avgTaste[0].tasteavg3,
          avgTaste[0].tasteavg4,
          avgTaste[0].tasteavg5
        ];
        const count = [
          reviewCount_1[0].count,
          reviewCount_2[0].count,
          reviewCount_3[0].count,
          reviewCount_4[0].count,
          reviewCount_5[0].count
        ];
        const productScore = await fetchProduct(
          doc.productId,
          Avg,
          taste,
          count
        );
        res.send(productScore);
      });
    });
  },

  fetchOneReview(req, res) {
    const { id } = req.params;

    Review.findById(id).exec((err, doc) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      if (!doc) {
        return res.status(404).json({ error: '리뷰가 없습니다.' });
      }

      return res.send(doc);
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
    const { query } = req;
    const { order = 'dateAdded' } = query;
    const count = parseInt(query.count),
      size = parseInt(query.size);

    Review.find({ productId, userId: { $ne: userId } })
      .populate('userId')
      .sort({ [order]: -1 })
      .skip(size * (count === 1 ? 0 : count))
      .limit(parseInt(size))
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
          resolve(0);
        } else {
          resolve(doc[0].scoreavg);
        }
      }
    });
  });

const fetchProduct = (Id, score, taste, count) =>
  new Promise(resolve => {
    Product.findByIdAndUpdate(
      Id,
      { avgScore: score, avgTaste: taste, reviewCount: count },
      { new: true }
    ).exec((err, doc) => {
      if (!err) {
        resolve(doc);
      }
    });
  });
const fetchTaste = Id =>
  new Promise(resolve => {
    Review.aggregate([
      { $match: { productId: Id } },
      {
        $group: {
          _id: '',
          tasteavg1: { $avg: { $arrayElemAt: ['$taste', 0] } },
          tasteavg2: { $avg: { $arrayElemAt: ['$taste', 1] } },
          tasteavg3: { $avg: { $arrayElemAt: ['$taste', 2] } },
          tasteavg4: { $avg: { $arrayElemAt: ['$taste', 3] } },
          tasteavg5: { $avg: { $arrayElemAt: ['$taste', 4] } }
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        console.log('doc1', doc);
        if (doc.length == 0) {
          resolve(0);
        } else {
          resolve(doc);
        }
      }
    });
  });

const fetchScoreCount = (Id, a, b) =>
  new Promise(resolve => {
    Review.aggregate([
      {
        $match: {
          $and: [
            { productId: Id },
            { score: { $gt: a } },
            { score: { $lte: b } }
          ]
        }
      },
      {
        $count: 'count'
      }
    ]).exec((err, doc) => {
      if (!err) {
        console.log('doc2', doc);
        if (doc.length == 0) {
          doc = [{ count: 0 }];
          resolve(doc);
        } else {
          resolve(doc);
        }
      }
    });
  });
