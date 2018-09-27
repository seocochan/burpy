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

    // DB에 리뷰를 저장
    const newReview = await new Review(values).save();

    // 통계 수치 계산
    const avgScore = await fetchScore(newReview.productId);
    const avgTaste = await fetchTaste(newReview.productId);
    const reviewCount = await fetchScoreCount(newReview.productId);

    const count = [
      reviewCount[0].one,
      reviewCount[0].two,
      reviewCount[0].three,
      reviewCount[0].four,
      reviewCount[0].five
    ];

    const taste = [
      avgTaste[0].tasteavg1,
      avgTaste[0].tasteavg2,
      avgTaste[0].tasteavg3,
      avgTaste[0].tasteavg4,
      avgTaste[0].tasteavg5
    ];

    // 계산된 통계값으로 상품을 업데이트
    const productScore = await fetchProduct(
      newReview.productId,
      avgScore,
      taste,
      count
    );

    // 포인트 지급
    await givePoint(userId, newReview.productId, newReview.category);

    return res.send(productScore);
  },

  async updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatedReview = await Review.findByIdAndUpdate(id, body, {
      new: true
    });
    const avgScore = await fetchScore(updatedReview.productId);
    const reviewCount = await fetchScoreCount(updatedReview.productId);

    const count = [
      reviewCount[0].one,
      reviewCount[0].two,
      reviewCount[0].three,
      reviewCount[0].four,
      reviewCount[0].five
    ];

    const avgTaste = await fetchTaste(updatedReview.productId);

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

        const Avg = await fetchScore(doc.productId);
        const reviewCount = await fetchScoreCount(doc.productId);

        const count = [
          reviewCount[0].one,
          reviewCount[0].two,
          reviewCount[0].three,
          reviewCount[0].four,
          reviewCount[0].five
        ];

        const avgTaste = await fetchTaste(doc.productId);

        const taste = [
          avgTaste[0].tasteavg1,
          avgTaste[0].tasteavg2,
          avgTaste[0].tasteavg3,
          avgTaste[0].tasteavg4,
          avgTaste[0].tasteavg5
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
        if (doc.length == 0) {
          score = [{ _id: '', scoreavg: 0 }];
          resolve(score[0].scoreavg);
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
        if (doc.length === 0) {
          taste = [
            {
              id: '',
              tasteavg1: 0,
              tasteavg2: 0,
              tasteavg3: 0,
              tasteavg4: 0,
              tasteavg5: 0
            }
          ];

          resolve(taste);
        } else {
          resolve(doc);
        }
      }
    });
  });

const fetchScoreCount = Id =>
  new Promise(resolve => {
    Review.aggregate([
      { $match: { productId: Id } },
      {
        $group: {
          _id: '',
          one: {
            $sum: {
              $cond: [{ $eq: ['$score', 1] }, 1, 0]
            }
          },
          two: {
            $sum: {
              $cond: [{ $eq: ['$score', 2] }, 1, 0]
            }
          },
          three: {
            $sum: {
              $cond: [{ $eq: ['$score', 3] }, 1, 0]
            }
          },
          four: {
            $sum: {
              $cond: [{ $eq: ['$score', 4] }, 1, 0]
            }
          },
          five: {
            $sum: {
              $cond: [{ $eq: ['$score', 5] }, 1, 0]
            }
          }
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        if (doc.length == 0) {
          count = [
            {
              id: '',
              one: 0,
              two: 0,
              three: 0,
              four: 0,
              five: 0
            }
          ];

          resolve(count);
        } else {
          resolve(doc);
        }
      }
    });
  });

const givePoint = (userId, productId, category) =>
  new Promise(resolve => {
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { [`reviewedProducts.${category}`]: productId } },
      { new: false }
    ).exec((err, doc) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      // 현재 사용자가 해당 상품에 처음 리뷰를 작성하는 경우
      if (!doc.reviewedProducts[category].includes(productId)) {
        User.findByIdAndUpdate(
          userId,
          { $inc: { points: 5 } },
          { new: true }
        ).exec((err, doc) => {
          if (err) {
            return res.status(500).send({ error: 'DB 에러: ' + err });
          }

          if (doc.reviewedProducts[category].length >= 10) {
            User.findByIdAndUpdate(userId, {
              $addToSet: { badges: category }
            }).exec((err, doc) => {
              if (err) {
                return res.status(500).send({ error: 'DB 에러: ' + err });
              }
              
              resolve(doc);
            });
          }

          resolve(doc);
        });
      } else {
        resolve(doc);
      }
    });
  });
