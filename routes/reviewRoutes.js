const ReviewControllers = require('../controllers/ReviewControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/review', ReviewControllers.fetchReviews);
  app.get('/api/review/:id', ReviewControllers.fetchOneReview);
  app.post('/api/review', requireLogin, ReviewControllers.addReview);
  app.put('/api/review/:id', requireLogin, ReviewControllers.updateReview);
  app.delete('/api/review/:id', requireLogin, ReviewControllers.removeReview);
};
