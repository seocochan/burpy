const Product = require('../models/Product');
const axios = require('axios');
const Fuse = require('fuse.js');
const Hangul = require('hangul-js');
const keys = require('../config/keys');
const url = keys.ICServerURL;

module.exports = {
  async addProduct(req, res) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).send({ error: '잘못된 요청입니다.' });
    }

    new Product(data).save((err, doc) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      return res.send(doc);
    });
  },

  updateProduct(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).send({ error: '잘못된 요청입니다.' });
    }

    Product.findByIdAndUpdate(id, data, { new: true }).exec((err, doc) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      return res.send(doc);
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

        return res.send(doc);
      });
  },

  fetchProductInfo(req, res) {
    const _id = req.params.id;
    Product.findOne({ _id }, (err, product) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (!product) {
        return res.status(404).json({ error: '상품이 없습니다.' });
      }
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

      return res.send({ result: doc });
    });
  },

  async addProductFromIC(req, res) {
    const data = req.body;
    console.log('### data from unity ###\n', data);

    if (Object.keys(data).length === 0) {
      return res.status(400).send({ error: '잘못된 요청입니다.' });
    }

    const { image, name, category } = data;

    new Product({ name, category }).save((err, doc) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      console.log('### new product created ###\n', doc);

      const id = doc._id;
      return res.send({ result: { id } }); // 유니티 클라이언트로 응답 보냄
    });
  },

  async suggestProducts(req, res) {
    const { q } = req.query;

    // 검색어가 없거나 공백인 경우
    if (!q) {
      return res.status(400).send({ result: '검색어를 입력하세요.' });
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
      return res.status(404).send({ result: collection });
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

    return res.send({ result });
  },

  async fetchFeaturedProduct(req, res) {
    const { standard, size } = req.query;
    const sortStandard = {
      mostRated: { avgScore: -1 },
      mostReviewd: { reviews: -1 },
      mostRecent: { _id: -1 }
    };

    Product.find({})
      .sort(sortStandard[standard])
      .limit(parseInt(size))
      .select({
        _id: 1,
        name: 1,
        category: 1,
        avgScore: 1,
        imageUrl: 1
      })
      .exec((err, doc) => {
        if (err) {
          console.warn(err);
          console.log(JSON.stringify(doc));

          return res.status(500).send({ error: 'DB 에러: ' + err });
        }

        return res.send(doc);
      });
  }
};
