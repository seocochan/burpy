const ReviewControllers = require('../controllers/ReviewControllers');

module.exports = app => {
  app.get('/api/review', ReviewControllers.fetchReviews);
  app.post('/api/review', ReviewControllers.addReview);
  app.put('/api/review', ReviewControllers.updateReview);
  app.delete('/api/review', ReviewControllers.removeReview);
};
