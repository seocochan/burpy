const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  fetchReviews(req, res) {
    console.log('get reviews');
  },

  addReview(req, res) {
    // TODO: 여기에 테스트 데이터 추가 쿼리 작성
    // 일단 미들웨어 없이 만들기
    // user는 req에서 가져오기
    // product는 하드코딩으로 지정하기 (1, 2, 3)
    // score, content 입력 후 저장
    // 다되면 MyProduct 컴포넌트에서 User.populate로 찍어보기

    console.log('add review');
  },

  updateReview(req, res) {
    console.log('update review');
  },

  removeReview(req, res) {
    console.log('remove review');
  }
};
