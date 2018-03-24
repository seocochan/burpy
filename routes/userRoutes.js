const UserControllers = require('../controllers/UserControllers');

module.exports = app => {
  app.get('/api/wishlist', UserControllers.fetchWishlist);
  app.delete('/api/wishlist/:id', UserControllers.deleteWishlistItem);
};
