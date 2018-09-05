const RecommendControllers = require('../controllers/RecommendControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/train/:id', requireLogin, RecommendControllers.trainRequest);
  app.get('/api/train', requireLogin, RecommendControllers.trainRequest);
  app.get('/api/predict/:id', requireLogin, RecommendControllers.predictRequest);
  app.get('/api/predict', requireLogin, RecommendControllers.predictRequest);
  app.get('/api/recommend', requireLogin, RecommendControllers.fetchRecommendItems);
};
