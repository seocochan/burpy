const UserControllers = require('../controllers/UserControllers');

module.exports = app => {
  app.get('/api/wishlist', UserControllers.fetchWishlist);
  app.delete('/api/wishlist/:id', UserControllers.deleteWishlistItem);
  app.get('/api/my-products', UserControllers.fetchMyProduct);
  app.post('/api/wishlist/:id',UserControllers.addWishlist);
  app.get('/api/myinfo',UserControllers.fetchMyInfo);
  app.put('/api/myinfo/:id',UserControllers.updateMyInfo);
};
