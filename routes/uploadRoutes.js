const UploadControllers = require('../controllers/UploadControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/upload', requireLogin, UploadControllers.getUrl);
};
