const passport = require('passport');
const AuthControllers = require('../controllers/AuthControllers');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // GoogleStrategy에 내장된 id인 'google'을 참조함.
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    AuthControllers.callback
  );
  app.get('/api/logout', AuthControllers.logout);
  app.get('/api/current_user', AuthControllers.currentUser);
};
