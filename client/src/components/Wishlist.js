import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: {}
    };
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      this.setState({ wishlist: res.data });
    });
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  onDeleteClick(id) {
    axios.delete(`/api/wishlist/${id}`).then(() => this.fetchWishlist());
  }

  renderList() {
    return _.map(this.state.wishlist, item => {
      return (
        <li key={item.productId}>
          <Link to={`/product/${item.productId._id}`}>
            {item.productId.name}
          </Link>
          <button onClick={this.onDeleteClick.bind(this, item.productId._id)}>
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

export default Wishlist;
