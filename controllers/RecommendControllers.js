const _ = require('lodash');
const axios = require('axios');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const keys = require('../config/keys');
const url = keys.ICServerURL;

module.exports = {
  async trainOneUserRequest(req, res) {
    const { id } = req.params;
    const fetched = await fetchTrainData(id);
    const payload = { id, data: processTrainData(fetched) };
    const dataRes = await axios.post(`${url}/train_data/`, payload);
    console.log(dataRes.data);
    axios.post(`${url}/train/`, [{ _id: id }]);
    // const trainRes = await axios.post(`${url}/train/`, [{ _id: id }]);
    // console.log(trainRes.data);

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
    axios.post(`${url}/train/`, userList);
    // const trainRes = await axios.post(`${url}/train/`, userList, {timeout: 60000});
    // console.log(trainRes.data);

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
    const userId = req.user._id;
    const response = await axios.post(`${url}/predict_result/`, userId);
    const predict = JSON.parse(response.data);

    let result = {};
    for (const [category, _items] of Object.entries(predict)) {
      const items = _items.slice(0, 3); // 상위 3개 결과로 제한
      result[category] = [];

      const list = items.map(item => item.id);
      const fetchedItems = await Product.aggregate([
        { $match: { _id: { $in: list } } },
        { $addFields: { __order: { $indexOfArray: [list, '$_id'] } } },
        { $sort: { __order: 1 } },
        { $project: { _id: 0, name: 1, avgScore: 1 } }
      ]);

      items.forEach((item, i) => {
        result[category].push({ ...item, ...fetchedItems[i] });
      });
    }

    res.send(result);
  }
};

const fetchUserList = () =>
  new Promise(resolve => {
    User.find({
      'reviews.9': {
        $exists: true
      }
    })
      .select({
        _id: 1
      })
      .exec((err, doc) => {
        if (!err) {
          resolve(doc);
          console.log('user list has been fetched');
        }
      });
  });

const fetchTrainData = userId =>
  new Promise(resolve => {
    Review.aggregate([
      {
        $lookup: {
          from: Product.collection.name,
          localField: 'productId',
          foreignField: '_id',
          as: 'productId'
        }
      },
      {
        $unwind: {
          path: '$productId'
        }
      },
      {
        $project: {
          'productId.productId': '$productId._id',
          'productId.avgTaste': 1,
          'productId.category': 1,
          score: 1,
          userId: 1
        }
      },
      {
        $sort: {
          'productId.productId': 1
        }
      },
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: '$productId.category',
          items: {
            $push: {
              product: '$productId',
              score: '$score'
            }
          }
        }
      },
      {
        $project: {
          'items.product.category': 0
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          items: 1
        }
      },
      {
        $sort: {
          category: 1
        }
      }
    ]).exec((err, doc) => {
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
      {
        $unwind: {
          path: '$reviews',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          category: {
            $first: '$category'
          },
          avgTaste: {
            $first: '$avgTaste'
          },
          reviews: {
            $push: '$reviews'
          }
        }
      },
      {
        $match: {
          reviews: {
            $not: {
              $elemMatch: {
                userId: mongoose.Types.ObjectId(userId)
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          productId: '$_id',
          category: 1,
          avgTaste: 1
        }
      },
      {
        $sort: {
          productId: 1
        }
      },
      {
        $group: {
          _id: '$category',
          items: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          'items.category': 0
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          items: 1
        }
      },
      {
        $sort: {
          category: 1
        }
      }
    ]).exec((err, doc) => {
      if (!err) {
        resolve(doc);
        console.log('predict data has been fetched');
      }
    });
  });

const processTrainData = data => {
  let processed = [];

  data.forEach(c => {
    const items = c.items.map(i => {
      return {
        productId: i.product.productId,
        avgTaste: i.product.avgTaste,
        score: i.score
      };
    });
    processed.push({ category: c.category, items });
  });

  console.log('train data has been processed');
  return processed;
};
