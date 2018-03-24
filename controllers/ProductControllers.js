const Product = require('../models/Product');

module.exports = {
  async fetchSearchItems(req, res) {
    const { query } = req;
    // 상품의 특정 필드만 추출하는 쿼리 작성 (productId, name)
    // 결과는 객체 배열

    console.log(query.q);

    Product.find({ name: { $regex: query.q } })
      .select({
        productId: 1,
        name: 1
      })
      .exec((err, doc) => {
        if (err) {
          console.warn(err);
          console.log(JSON.stringify(doc));
        }
        res.send(doc);
      });
  }
};
