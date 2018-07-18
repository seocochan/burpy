const RecommendControllers = require('../controllers/RecommendControllers');

module.exports = app => {
  app.get('/api/train/:id', RecommendControllers.trainRequest);
  app.get('/api/train', RecommendControllers.trainRequest);
  app.get('/api/predict/:id', RecommendControllers.predictRequest);
  app.get('/api/predict', RecommendControllers.predictRequest);
  app.get('/api/recommend', RecommendControllers.fetchRecommendItems);
};
