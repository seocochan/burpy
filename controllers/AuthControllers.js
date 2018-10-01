const User = require('../models/User');
const Review = require('../models/Review');

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
  },

  closeUser(req, res) {
    const userId = req.user.id;

    // delete all reviews
    Review.find({ userId }).exec((err, docs) => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }

      docs.forEach(doc => {
        doc.remove(err => {
          if (err) {
            return res.status(500).send({ error: 'DB 에러: ' + err });
          }
        });
      });
    });

    // delete user doc
    User.findByIdAndRemove(userId, err => {
      if (err) {
        return res.status(500).send({ error: 'DB 에러: ' + err });
      }
    });

    // logout
    req.logout();
    req.session = null;
    res
      .status(200)
      .clearCookie('session', { path: '/' })
      .clearCookie('session.sig', { path: '/' })
      .send('done');
  }
};
