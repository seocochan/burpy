const Product = require('../models/Product');

module.exports = {
  async fetchSearchItems(req, res) {
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
  }
};
