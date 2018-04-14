const ReviewControllers = require('../controllers/ReviewControllers');

module.exports = app => {
  app.get('/api/review', ReviewControllers.fetchReviews);
  app.get('/api/review/:id', ReviewControllers.fetchOneReview);
  app.post('/api/review', ReviewControllers.addReview);
  app.put('/api/review/:id', ReviewControllers.updateReview);
  app.delete('/api/review/:id', ReviewControllers.removeReview);
};
