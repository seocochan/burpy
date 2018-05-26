const express = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const secreat = require('./config/secret');
require('./models/User');
require('./sevices/passport');

// DB 설정
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
const connection = mongoose.connection;
autoIncrement.initialize(connection);

// express 설정
const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 라우터 번들 설정
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/reviewRoutes')(app);

// 빌드 설정
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);