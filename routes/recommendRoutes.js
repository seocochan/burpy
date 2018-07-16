const RecommendControllers = require('../controllers/RecommendControllers');

module.exports = app => {
  app.get('/api/train/:id', RecommendControllers.trainOneUserRequest);
  app.get('/api/train', RecommendControllers.trainAllUserRequest);
  app.get('/api/predict/:id', RecommendControllers.predictOneUserRequest);
  app.get('/api/predict', RecommendControllers.predictAllUserRequest);
  app.get('/api/recommend', RecommendControllers.fetchRecommendItems);
};
