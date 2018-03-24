module.exports = {
  callback(req, res) {
    res.redirect('/');
  },

  logout(req, res) {
    req.logout();
    // logout은 passport 미들웨어에 의해 정의됨.
    res.redirect('/');
  },

  currentUser(req, res) {
    res.send(req.user);
  }
};
