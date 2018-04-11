const ProductControllers = require('../controllers/ProductControllers');

module.exports = app => {
  app.get('/api/search_result', ProductControllers.fetchSearchItems);
  app.get('/api/product/:id', ProductControllers.fetchProductInfo);
  app.post('/api/product', ProductControllers.addProduct);
};