const Product = require('../models/Product');

module.exports = {
  async fetchSearchItems(req, res) {
    const { query } = req;
    console.log('검색어', query.q);
    console.log(`정렬기준: ${query.order}, 필터: ${query.filter}`);

    // order값이 있으면 적용, 없으면 id로 정렬
    const sortStandard = query.order ? query.order : 'productId';

    Product.find({ name: { $regex: query.q } })
      .select({
        productId: 1,
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
  }
};
