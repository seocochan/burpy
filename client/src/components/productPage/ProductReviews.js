import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';

class ProductReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };

    this.productId = props.productId;
    this.hasReview = null;
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.productId}/reviews`);
    this.setState({ reviews: res.data });
  }

  renderReviews() {
    if (this.hasReview) {
      return _.map(this.state.reviews, item => {
        return (
          <li key={item._id}>
            ID: {item.userId.googleId}
            평점: {item.score}
            코멘트: {item.comment}
          </li>
        );
      });
    } else {
      return (
        <div>
          <p>아직 사용자들의 리뷰가 없습니다.</p>
        </div>
      );
    }
  }

  render() {
    this.hasReview = this.state.reviews.length != 0 ? true : false;

    return (
      <div>
        <h4>리뷰 목록</h4>
        <ul>{this.renderReviews()}</ul>
      </div>
    );
  }
}

export default ProductReviews;
