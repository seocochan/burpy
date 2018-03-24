const ProductControllers = require('../controllers/ProductControllers');

module.exports = app => {
  app.get('/api/search_result', ProductControllers.fetchSearchItems);
};