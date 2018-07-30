import _ from 'lodash';
import axios from 'axios';
import React, { Component, Fragment } from 'react';

class ProductReviews extends Component {
  constructor(props) {
    super(props);

    this.productId = props.productId;
    this.hasReview = null;
  }

  renderReviews() {
    const { reviews } = this.props;

    if (this.hasReview) {
      return _.map(reviews, item => {
        return (
          <li key={item._id}>
            ID: {item.userId.name}
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
    this.hasReview = this.props.reviews.length != 0 ? true : false;

    return (
      <Fragment>
        <h4>리뷰 목록</h4>
        <ul>{this.renderReviews()}</ul>
      </Fragment>
    );
  }
}

export default ProductReviews;
