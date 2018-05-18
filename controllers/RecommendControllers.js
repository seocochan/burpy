const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  trainOneUserRequest(req, res) {
    // 1. 학습용 데이터 요청 쿼리 및 가공
    // 2. IC 서버에 데이터 전달 및 학습 요청
  },

  trainAllUserRequest(req, res) {
    // 1. 전체 유저 목록 쿼리
    // 2. trainOneUserRequest를 반복 수행
  },

  predictOneUserRequest(req, res) {
    // 1. 예측용 데이터 요청 쿼리 및 가공
    // 2. IC 서버에 데이터 전달 및 예측 요청
  },

  predictAllUserRequest(req, res) {
    // 1. 전체 유저 목록 쿼리
    // 2. predictOneUserRequest를 반복 수행
  },

  fetchRecommendItems(req, res) {
    // 1. 유저별 저장된 학습 결과 조회
    // 2. 클라이언트에 출력하기 위해 가공 및 전달
  }
};

const train = () => {
  //
};

const predict = () => {
  //
};
