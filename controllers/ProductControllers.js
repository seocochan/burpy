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
    console.log(req.body);

    const newProduct = await new Product(req.body).save();
    res.send(newProduct);
  }
};
