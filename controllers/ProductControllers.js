const Product = require('../models/Product');
const axios = require('axios');
const Fuse = require('fuse.js');
const Hangul = require('hangul-js');
const keys = require('../config/keys');
const url = keys.ICServerURL;

module.exports = {
  async addProduct(req, res) {
    const newProduct = await new Product(req.body).save();
    res.send(newProduct);
  },

  updateProduct(req, res) {
    const { id } = req.params;
    const { body } = req;

    Product.findByIdAndUpdate(id, body, { new: true }).exec((err, doc) => {
      res.send(doc);
    });
  },

  async fetchSearchItems(req, res) {
    const { query } = req;
    const count = parseInt(query.count),
      size = parseInt(query.size);

    // 검색어가 지정되지 않은 경우 처리
    const q = query.q ? { name: { $regex: query.q } } : {};

    // 필터가 지정되지 않은 경우 처리
    const category =
      query.category !== undefined && query.category !== 'all'
        ? { category: query.category }
        : {};

    // 정렬 기준 기본값 지정
    const sortStandard =
      query.order === undefined || query.order === 'name'
        ? { name: 1 }
        : { avgScore: -1 };

    Product.find({ ...q, ...category })
      .select({
        _id: 1,
        name: 1,
        category: 1,
        avgScore: 1,
        imageUrl: 1
      })
      .sort(sortStandard)
      .skip(size * (count === 1 ? 0 : count))
      .limit(parseInt(size))
      .exec((err, doc) => {
        if (err) {
          console.warn(err);
          console.log(JSON.stringify(doc));
        }
        res.send(doc);
      });
  },

  fetchProductInfo(req, res) {
    const _id = req.params.id;
    Product.findOne({ _id }, (err, product) => {
      if (err) return res.status(500).json({ error: err });
      if (!product) return res.status(404).json({ error: 'product not found' });
    })
      .populate('reviews')
      .then(product => res.send(product));
  },

  async fetchPredictedItems(req, res) {
    const { list } = req.body;

    Product.aggregate([
      { $match: { _id: { $in: list } } },
      { $addFields: { __order: { $indexOfArray: [list, '$_id'] } } },
      { $sort: { __order: 1 } },
      { $project: { _id: 1, name: 1, category: 1, avgScore: 1 } }
    ]).exec((err, doc) => {
      if (err) {
        console.warn(err);
        console.log(JSON.stringify(doc));
      }
      res.send({ result: doc });
    });
  },

  async addProductFromIC(req, res) {
    console.log('### data from unity ###\n', req.body);
    const { image, name, category } = req.body;

    const newProduct = await new Product({ name, category }).save();
    const id = newProduct._id;
    console.log('### new product created ###\n', newProduct);

    res.send({ result: { id } }); // 유니티 클라이언트로 응답 보냄
  },

  async suggestProducts(req, res) {
    const { q } = req.query;

    // 검색어가 없거나 공백인 경우
    if (!q) {
      return res.status(404).send('검색어를 입력하세요.');
    }

    let collection = await Product.find({
      name: { $regex: q.substr(0, 1) }
    }).select({
      _id: 1,
      name: 1,
      category: 1
    });

    // 검색 결과가 없는 경우
    if (collection.length === 0) {
      return res.send(collection);
    }

    // 자모 분해한 필드를 collection에 추가
    collection = collection.map(item => ({
      ...item._doc,
      destName: Hangul.disassemble(item.name).join('')
    }));

    const fuse = new Fuse(collection, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['destName']
      // keys: ['name']
    });
    const result = fuse.search(Hangul.disassemble(q).join('')).slice(0, 5);

    console.log(collection);
    res.send(result);
  }
};
