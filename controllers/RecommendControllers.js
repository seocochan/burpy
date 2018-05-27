const axios = require('axios');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const keys = require('../config/keys');
const url = 'http://localhost:8000';
// const url = keys.ICServerURL;

module.exports = {
  async trainOneUserRequest(req, res) {
    const { id } = req.params;
    const fetched = await fetchTrainData(id);
    const payload = { id, data: processTrainData(fetched) };
    const dataRes = await axios.post(`${url}/train_data/`, payload);
    console.log(dataRes.data);
    const trainRes = await axios.post(`${url}/train/`, [{ _id: id }]);
    console.log(trainRes.data);

    res.send('train has done');
  },

  async predictOneUserRequest(req, res) {
    const { id } = req.params;
    const fetched = await fetchPredictData(id);
    const payload = { id, data: fetched };
    const dataRes = await axios.post(`${url}/predict_data/`, payload);
    console.log(dataRes.data);
    const predictRes = await axios.post(`${url}/predict/`, [{ _id: id }]);
    console.log(predictRes.data);

    res.send('predict has done');
  },

  async trainAllUserRequest(req, res) {
    const userList = await fetchUserList();
    for (const { _id } of userList) {
      const fetched = await fetchTrainData(_id);
      const payload = { id: _id, data: processTrainData(fetched) };
      const dataRes = await axios.post(`${url}/train_data/`, payload);
      console.log(dataRes.data);
    }
    const trainRes = await axios.post(`${url}/train/`, userList);
    console.log(trainRes.data);

    res.send('train has done');
  },

  async predictAllUserRequest(req, res) {
    const userList = await fetchUserList();
    for (const { _id } of userList) {
      const fetched = await fetchPredictData(_id);
      const payload = { id: _id, data: fetched };
      const dataRes = await axios.post(`${url}/predict_data/`, payload);
      console.log(dataRes.data);
    }
    const predictRes = await axios.post(`${url}/predict/`, userList);
    console.log(predictRes.data);

    res.send('predict has done');
  },

  async fetchRecommendItems(req, res) {
    const { id } = req.params;
    const result = await axios.post(`${url}/predict_result/`, id);

    res.send(result.data);
  }
};

const fetchUserList = () =>
  new Promise(resolve => {
    User.find({ 'reviews.9': { $exists: true } })
      .select({ _id: 1 })
      .exec((err, doc) => {
        if (!err) {
          resolve(doc);
          console.log('user list has been fetched');
        }
      });
  });

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
          console.log('train data has been fetched');
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
        console.log('predict data has been fetched');
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

  console.log('train data has been processed');
  return processed;
};
