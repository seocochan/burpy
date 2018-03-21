import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">로그인</a>
          </li>
        );
      default:
        // 로그인 상태인 경우
        return [
          <li key="1" style={{ margin: '0 10px' }}>
            <a href="/wishlist">찜목록</a>
          </li>,
          <li key="2">
            <a href="/api/logout">로그아웃</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/' : '/'}
            // 로고 클릭시 로그인 상태면 survey(-> / )로, 아니면 초기화면으로
            className="left brand-logo"
          >
            Burpy
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
