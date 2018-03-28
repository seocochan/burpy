const Product = require('../models/Product');

module.exports = {
  async fetchSearchItems(req, res) {
<<<<<<< HEAD
    console.log('요청받음');

    // 저장 테스트
    const item = await new Product({
      productId: 1,
      name: "기린",
      category: "맥주",
      details: "무난하다. 4캔 만원."
    }).save()
    console.log(item);

    const payload = [{첫번째: 1}, {두번째: 2}];
    res.send(payload);
=======
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
>>>>>>> seoco
  }
};
