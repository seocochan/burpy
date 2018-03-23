// const Product = require('../models/Product');

module.exports = {
  fetchSearchItems(req, res) {
    console.log('요청받음');
    const payload = [{첫번째: 1}, {두번째: 2}];
    res.send(payload);
  }
};
