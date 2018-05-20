const axios = require('axios');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

const url = 'http://localhost:8000';

module.exports = {
  async trainOneUserRequest(req, res) {
    console.log('requesting train for one user...');

    const { id } = req.params;
    const fetched = await fetchTrainData(id);
    const payload = { id, data: processTrainData(fetched) };
    const dataRes = await axios.post(`${url}/train_data/`, payload);
    console.log(dataRes.data);
    const trainRes = await axios.post(`${url}/train/`, id);
    console.log(trainRes.data);

    res.send('training is done');
  },

  async predictOneUserRequest(req, res) {
    console.log('requesting predict for one user...');

    const { id } = req.params;
    const fetched = await fetchPredictData(id);
    const payload = { id, data: fetched };
    const dataRes = await axios.post(`${url}/predict_data/`, payload);
    console.log(dataRes.data);
    const predictRes = await axios.post(`${url}/predict/`, id);
    console.log(predictRes.data);

    res.send('prediction is done');
  },

  trainAllUserRequest(req, res) {
    // 1. 전체 유저 목록 쿼리
    // 2. trainOneUserRequest를 반복 수행
  },

  predictAllUserRequest(req, res) {
    // 1. 전체 유저 목록 쿼리
    // 2. predictOneUserRequest를 반복 수행
  },

  async fetchRecommendItems(req, res) {
    const { id } = req.params;
    const result = await axios.post(`${url}/predict_result/`, id);

    res.send(result.data);
  }
};

const fetchTrainData = userId =>
  new Promise(resolve => {
    Review.find({ userId })
      .populate({ path: 'productId', select: { _id: 1, avgTaste: 1 } })
      .select({
        _id: 0,
        productId: 1,
        score: 1
      })
      .exec((err, doc) => {
        if (!err) {
          resolve(doc);
          console.log('train data has fetched');
        }
      });
  });

const fetchPredictData = userId =>
  new Promise(resolve => {
    Product.aggregate([
      {
        $lookup: {
          from: Review.collection.name,
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews'
        }
      },
      { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          avgTaste: { $first: '$avgTaste' },
          reviews: { $push: '$reviews' }
        }
      },
      {
        $match: {
          reviews: {
            $not: { $elemMatch: { userId: mongoose.Types.ObjectId(userId) } }
          }
        }
      },
      { $project: { _id: 0, productId: '$_id', avgTaste: 1 } },
      { $sort: { productId: 1 } }
    ]).exec((err, doc) => {
      if (!err) {
        resolve(doc);
        console.log('predict data has fetched');
      }
    });
  });

const processTrainData = data => {
  const processed = data.map(item => {
    return {
      productId: item.productId._id,
      avgTaste: item.productId.avgTaste,
      score: item.score
    };
  });

  console.log('train data has processed');
  return processed;
};
