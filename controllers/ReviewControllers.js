const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    const {query} = req;
    const sortStandard = query.order === undefined || query.order ==='dateAdded'
    ? {dateAdded : -1}
    : {score : -1};
    User.findById(req.user._id)
      .populate({
        path: 'reviews',
        populate: { path: 'productId' }
      })
      .sort({dateAdded : -1})
      .exec((err, doc) => {
        res.send(doc.reviews);
      });
  },

  async addReview(req, res) {
    const userId = req.user._id;
    const values = { userId, ...req.body };

    const newReview = await new Review(values).save();
    const avgScore = await fetchScore(newReview.productId);
    const avgTaste = await fetchTaste(newReview.productId);
    const reviewCount = await fetchScoreCount(newReview.productId);
    const count = [reviewCount[0].one,reviewCount[0].two,reviewCount[0].three,reviewCount[0].four,reviewCount[0].five];
    const taste = [avgTaste[0].tasteavg1, avgTaste[0].tasteavg2,avgTaste[0].tasteavg3,avgTaste[0].tasteavg4,avgTaste[0].tasteavg5];
    const productScore = await fetchProduct(newReview.productId, avgScore,taste,count);
    res.send(productScore);
  },

  async updateReview(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatedReview = await Review.findByIdAndUpdate(id, body, {
      new: true
    });
    const avgScore = await fetchScore(updatedReview.productId);
    const reviewCount = await fetchScoreCount(updatedReview.productId);
    const count = [reviewCount[0].one,reviewCount[0].two,reviewCount[0].three,reviewCount[0].four,reviewCount[0].five];
    const avgTaste = await fetchTaste(updatedReview.productId);
    const taste = [avgTaste[0].tasteavg1, avgTaste[0].tasteavg2,avgTaste[0].tasteavg3,avgTaste[0].tasteavg4,avgTaste[0].tasteavg5];
    const productScore = await fetchProduct(updatedReview.productId, avgScore,taste,count);
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
        const reviewCount = await fetchScoreCount(doc.productId);
        const count = [reviewCount[0].one,reviewCount[0].two,reviewCount[0].three,reviewCount[0].four,reviewCount[0].five];
        const avgTaste = await fetchTaste(doc.productId);
        const taste = [avgTaste[0].tasteavg1, avgTaste[0].tasteavg2,avgTaste[0].tasteavg3,avgTaste[0].tasteavg4,avgTaste[0].tasteavg5];
        const productScore = await fetchProduct(doc.productId, Avg,taste,count);
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
    const {query} = req;
    const sortStandard = query.order === undefined || query.order ==='dateAdded'
    ? {dateAdded : -1}
    : {score : -1};

    // FIX: dateAdded 순으로 정렬
    Review.find({ productId, userId: { $ne: userId } })
      .populate('userId')
      .sort(sortStandard)
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

const fetchProduct = (Id, score,taste,count) =>
  new Promise(resolve => {
    Product.findByIdAndUpdate(Id, { avgScore: score, avgTaste : taste, reviewCount : count}, { new: true }).exec(
      (err, doc) => {
        if (!err) {
          resolve(doc);
        }
      }
    );
  });
  const fetchTaste = Id =>
  new Promise(resolve => {
    Review.aggregate([
      { $match: { productId: Id } },
      {
        $group : {
          _id:'',
          tasteavg1 : {$avg : { $arrayElemAt : [ "$taste",0]}},
          tasteavg2 : {$avg : { $arrayElemAt : [ "$taste",1]}},
          tasteavg3 : {$avg : { $arrayElemAt : [ "$taste",2]}},
          tasteavg4 : {$avg : { $arrayElemAt : [ "$taste",3]}},
          tasteavg5 : {$avg : { $arrayElemAt : [ "$taste",4]}},
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        console.log('doc1', doc);
        if (doc.length == 0) {
          doc = {
            id : '',
            tasteavg1 : 0,
            tasteavg2 : 0,
            tasteavg3 : 0,
            tasteavg4 : 0,
            tasteavg5 : 0
          }
          resolve(0);
        } else {
          resolve(doc);
        }
      }
    });
  });
  const fetchScoreCount = (Id)=>
  new Promise(resolve => {
    Review.aggregate([
      { $match:  {productId : Id} },
      {
        $group : {
          _id : '',
          one : {
            $sum : {
              $cond : [
                {$eq : ["$score",1]},1,0
              ]
            }
          },
          two : {
            $sum : {
              $cond : [
                {$eq : ["$score",2]},1,0
              ]
            }
          },
          three : {
            $sum : {
              $cond : [
                {$eq : ["$score",3]},1,0
              ]
            }
          },
          four : {
            $sum : {
              $cond : [
                {$eq : ["$score",4]},1,0
              ]
            }
          },
          five : {
            $sum : {
              $cond : [
                {$eq : ["$score",5]},1,0
              ]
            }
          }
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        console.log('doc2', doc);
        if (doc.length == 0) {
          doc = {
            id : '',
            one : 0,
            two : 0,
            three : 0,
            four : 0,
            five : 0
          }
          resolve(doc);
        } else {
          resolve(doc);
        }
      }
    });
  });

