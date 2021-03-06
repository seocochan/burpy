const ProductControllers = require('../controllers/ProductControllers');
const ReviewControllers = require('../controllers/ReviewControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/product', ProductControllers.addProduct);
  app.put('/api/product/:id',ProductControllers.updateProduct);
  app.get('/api/search_result', ProductControllers.fetchSearchItems);
  app.get('/api/product/:id', ProductControllers.fetchProductInfo);
  app.get('/api/product/:id/my_review', requireLogin, ReviewControllers.fetchMyReview);
  app.get('/api/product/:id/reviews', ReviewControllers.fetchProductReviews);
  app.post('/api/predict', ProductControllers.fetchPredictedItems);
  app.post('/api/product/ic', ProductControllers.addProductFromIC);
  app.get('/api/suggest', ProductControllers.suggestProducts);
  app.get('/api/featured-product', ProductControllers.fetchFeaturedProduct);
};
