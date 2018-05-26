const ProductControllers = require('../controllers/ProductControllers');
const ReviewControllers = require('../controllers/ReviewControllers');

module.exports = app => {
  app.get('/api/search_result', ProductControllers.fetchSearchItems);
  app.post('/api/product', ProductControllers.addProduct);
  app.get('/api/product/:id', ProductControllers.fetchProductInfo);
  app.get('/api/product/:id/my_review', ReviewControllers.fetchMyReview);
  app.get('/api/product/:id/reviews', ReviewControllers.fetchProductReviews);
  app.put('/api/product/:id',ProductControllers.updateProduct);
};
