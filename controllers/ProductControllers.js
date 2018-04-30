const Product = require('../models/Product');

module.exports = {
  async fetchSearchItems(req, res) {
    const { query } = req;
    const q = query.q ? { name: { $regex: query.q } } : {}; // 검색어가 지정되지 않은 경우 처리
    const category = query.category ? { category: query.category } : {}; // 필터가 지정되지 않은 경우 처리
    const sortStandard = query.order ? query.order : '_id'; // order값이 있으면 적용, 없으면 id로 정렬

    Product.find({ ...q, ...category })
      .select({
        _id: 1,
        name: 1,
        avgScore: 1
      })
      .sort(sortStandard)
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
    }).then(product => res.send(product));
  },

  async addProduct(req, res) {
    const newProduct = await new Product(req.body).save();
    res.send(newProduct);
  },

  async fetchPredictedItems(req, res) {
    /*
    @input:
    [10, 18, 3, 4, 2]

    @output:
      [
        {"_id": 10, "name": "하이네켄", "category": "맥주", "avgScore": 3.0},
        {"_id": 18, "name": "맥심 티오피", "category": "커피", "avgScore": 2.8},
        ...    // 5 items
      ]
    */

    Product.aggregate([
      { $match: { _id: { $in: req.body } } },
      { $addFields: { __order: { $indexOfArray: [req.body, '$_id'] } } },
      { $sort: { __order: 1 } },
      { $project: { _id: 1, name: 1, category: 1, avgScore: 1 } }
    ]).exec((err, doc) => {
      if (err) {
        console.warn(err);
        console.log(JSON.stringify(doc));
      }
      res.send(doc);
    });
  }
};
