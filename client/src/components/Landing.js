import React from 'react';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>BURPY</h1>
      <h3>가입하세요.</h3>
      <a href="/auth/google">구글 계정으로 로그인/가입하기</a>
      <hr/>
      <a href = "/auth/twitter">트위터 로그인/가입하기</a>
      <hr/>
      <a href = "/auth/login/naver">네이버 로그인/가입하기</a>
    </div>
  );
};

export default Landing;
