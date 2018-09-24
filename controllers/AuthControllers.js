module.exports = {
  callback(req, res) {
    res.redirect('/');
  },

  logout(req, res) {
    req.logout();

    req.session = null;
    res
      .status(200)
      .clearCookie('session', { path: '/' })
      .clearCookie('session.sig', { path: '/' })
      .redirect('/');
  },

  currentUser(req, res) {
    res.send(req.user);
  }
};
