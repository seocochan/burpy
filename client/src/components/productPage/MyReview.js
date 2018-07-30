import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

class MyReview extends Component {
  constructor(props) {
    super(props);

    this.productId = props.productId;
    this.reviewId = null;
    this.hasReview = null;
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(id) {
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      this.props.onDelete();
    }
  }

  renderMyReview() {
    const { classes, myReview } = this.props;

    if (this.hasReview) {
      return (
        <Fragment>
          <Rating
            readonly
            fractions={2}
            initialRating={parseFloat(myReview.score)}
          />
          코멘트: {myReview.comment}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <p>아직 내 리뷰가 없습니다.</p>
        </Fragment>
      );
    }
  }

  renderButtons() {
    const { myReview } = this.props;

    if (this.hasReview) {
      return (
        <Fragment>
          <IconButton
            aria-label="Delete"
            onClick={() => this.handleDelete(myReview._id)}
          >
            <Delete />
          </IconButton>
          <IconButton
            aria-label="Edit"
            component={Link}
            to={`/edit/review/${this.reviewId}`}
          >
            <Edit />
          </IconButton>
        </Fragment>
      );
    } else {
      return (
        <Button
          variant="raised"
          size="small"
          component={Link}
          to={`/new/review/${this.productId}`}
        >
          <Edit />
          리뷰 등록
        </Button>
      );
    }
  }

  render() {
    const { myReview } = this.props;
    this.hasReview = _.isEmpty(myReview) ? false : true;
    this.hasReview && (this.reviewId = myReview._id);

    return (
      <Fragment>
        <h4>내 리뷰</h4>
        {this.renderMyReview()}
        {this.renderButtons()}
      </Fragment>
    );
  }
}

const styles = theme => ({
  //
});

export default withStyles(styles)(MyReview);
