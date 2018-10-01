const passport = require('passport');
const AuthControllers = require('../controllers/AuthControllers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // GoogleStrategy에 내장된 id인 'google'을 참조함.
      scope: ['profile', 'email'],
      accessType: 'offline',
      prompt: 'consent'
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    AuthControllers.callback
  );
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  app.get(
    '/auth/login/naver',
    passport.authenticate('naver', {
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/login/naver/callback',
    passport.authenticate('naver'),
    AuthControllers.callback
  );

  app.get('/api/logout', AuthControllers.logout);
  app.get('/api/current_user', AuthControllers.currentUser);
  app.delete('/api/auth', requireLogin, AuthControllers.closeUser);
};
