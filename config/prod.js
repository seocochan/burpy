// prod.js - 배포용 프로젝트에 적용될 키
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLKETE_CLIENT_SECRET,
  twitterClientSecret : process.env.TWITTER_CLIENT_SECRET,
  twitterClientID : process.env.TWITTER_CLIENT_ID,
  naverClientID : process.env.NAVER_CLIENT_ID,
  naverClientSecret : process.env.NAVER_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  ICServerURL: process.env.IC_SERVER_URL
};
