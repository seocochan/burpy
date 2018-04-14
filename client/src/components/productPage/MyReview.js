import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { Button, IconButton, Paper } from 'material-ui';
import { Delete, Edit } from 'material-ui-icons';
import { Link } from 'react-router-dom';

class MyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myReview: {}
    };

    this.productId = props.productId;
    this.reviewId = null;
    this.hasReview = null;
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.productId}/my_review`);
    this.setState({ myReview: res.data });
  }

  async handleDelete(id) {
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      this.setState({ myReview: {} });
    }
  }

  renderMyReview() {
    if (this.hasReview) {
      const review = this.state.myReview;

      return (
        <div>
          <Rating
            readonly
            fractions={2}
            initialRating={parseFloat(review.score)}
          />
          <Paper elevation={4} style={{ width: '70%', margin: 'auto' }}>
            {review.comment}
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <p>아직 내 리뷰가 없습니다.</p>
        </div>
      );
    }
  }

  renderButtons() {
    if (this.hasReview) {
      return (
        <div>
          <IconButton
            aria-label="Delete"
            onClick={() => this.handleDelete(this.state.myReview._id)}
          >
            <Delete />
          </IconButton>
          <IconButton aria-label="Edit">
            <Link to={`/edit/review/${this.reviewId}`}>
              <Edit />
            </Link>
          </IconButton>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="raised" size="small">
            <Link to={`/new/review/${this.productId}`}>
              <Edit />
              리뷰 등록
            </Link>
          </Button>
        </div>
      );
    }
  }

  render() {
    this.hasReview = _.isEmpty(this.state.myReview) ? false : true;
    this.hasReview && (this.reviewId = this.state.myReview._id);

    return (
      <div>
        <h4>내 리뷰</h4>
        {this.renderMyReview()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default MyReview;
