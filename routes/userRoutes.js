const UserControllers = require('../controllers/UserControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/wishlist', requireLogin, UserControllers.fetchWishlist);
  app.delete('/api/wishlist/:id', requireLogin, UserControllers.deleteWishlistItem);
  app.get('/api/my-products', requireLogin, UserControllers.fetchMyProduct);
  app.post('/api/wishlist/:id', requireLogin, UserControllers.addWishlist);
  app.get('/api/myinfo', requireLogin, UserControllers.fetchMyInfo);
  app.put('/api/myinfo/:id', requireLogin, UserControllers.updateMyInfo);
};
