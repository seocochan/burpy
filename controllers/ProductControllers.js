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
    })
      .populate('reviews')
      .then(product => res.send(product));
  },

  async addProduct(req, res) {
    const newProduct = await new Product(req.body).save();
    res.send(newProduct);
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

  updateProduct(req, res) {
    const { id } = req.params;
    const { body } = req;

    Product.findByIdAndUpdate(id, body, { new: true }).exec((err, doc) => {
      res.send(doc);
    });
  }
};
