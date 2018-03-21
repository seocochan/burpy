import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Wishlist extends Component {
  componentDidMount() {
    // TODO: 각 productId를 조회하여 정보를 fetch하는 액션
    // this.props.fetchWishlistItems();
  }

  onDeleteClick(id) {
    this.props.deleteWishlistItem(id);
  }

  renderList() {
    return _.map(this.props.wishlist, item => {
      return (
        <li key={item.productId}>
          {item.name}
          <button onClick={this.onDeleteClick.bind(this, item.productId)}>
            삭제
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>찜한 상품 목록</h3>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    // auth가 로딩 완료되어 null이 아닐때 wishlist를 가져옴.
    wishlist: auth ? auth.wishlist : null
  };
}

export default connect(mapStateToProps, actions)(Wishlist);
