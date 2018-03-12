// keys.js - 어떤 인증정보를 반환할지 결정
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
