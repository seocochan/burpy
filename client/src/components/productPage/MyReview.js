import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Paper } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

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
    const { classes } = this.props;

    if (this.hasReview) {
      const review = this.state.myReview;

      return (
        <Fragment>
          <Rating
            readonly
            fractions={2}
            initialRating={parseFloat(review.score)}
          />
          <Paper elevation={4} className={classes.paper}>
            {review.comment}
          </Paper>
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
    if (this.hasReview) {
      return (
        <Fragment>
          <IconButton
            aria-label="Delete"
            onClick={() => this.handleDelete(this.state.myReview._id)}
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
    this.hasReview = _.isEmpty(this.state.myReview) ? false : true;
    this.hasReview && (this.reviewId = this.state.myReview._id);

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
  paper: {
    width: '70%',
    margin: 'auto'
  }
});

export default withStyles(styles)(MyReview);
