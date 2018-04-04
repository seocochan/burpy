import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyProducts extends Component {
  state = { reviews: [] };

  componentDidMount() {
    axios.get('/api/review').then(res => this.setState({ reviews: res.data }));
  }

  renderList() {
    return _.map(this.state.reviews, item => {
      return (
        <li key={item._id}>
          <Link to={`/product/${item.productId._id}`}>{item.productId.name}</Link>
          내 평점: {item.score}
          코멘트: {item.content}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>내 상품</h3>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default MyProducts;
