import _ from 'lodash';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import ProductCard from '../components/ProductCard';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Divider,
  Grid,
  CircularProgress,
  Snackbar
} from '@material-ui/core';

class MyBarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      sort: 'dateAdded',
      open: false,
      isToggleOn: null
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.currentState = null;
  }

  async componentDidMount() {
    const reviews = await axios.get('/api/review');

    this.changeSort(reviews.data, 'dateAdded');
    this.setState({ isToggleOn: true });
  }

  async handleDelete(id) {
    const { isToggleOn } = this.state;
    this.currentState = isToggleOn;

    await this.setState({ isToggleOn: null });
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      const newReviews = _.filter(this.state.reviews, item => {
        return !(item._id === id);
      });

      this.setState({ reviews: newReviews, open: true, isToggleOn: true });
    }
  }

  changeSort(list, standard) {
    const sorted = list.concat().sort((a, b) => {
      if (a[standard] > b[standard]) {
        return -1;
      }

      if (a[standard] < b[standard]) {
        return 1;
      }

      return 0;
    });

    this.setState({ reviews: sorted, sort: standard });
  }

  renderSnackBar() {
    const { open } = this.state;

    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => this.setState({ open: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">마이바에서 제거</span>}
      />
    );
  }

  renderList() {
    const { reviews } = this.state;

    return _.map(reviews, item => {
      const { productId: product, ...review } = item;

      return (
        <Grid item key={product._id} xs={12} md={6}>
          <ProductCard
            key={product._id}
            product={product}
            review={review}
            onDeleteReview={this.handleDelete}
            reviewOn={this.state.isToggleOn}
          />
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { reviews, sort } = this.state;

    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.titleContainer}>
            <Typography
              className={classes.title}
              variant="title"
              component="h2"
              gutterBottom
            >
              마이바
            </Typography>
            <Button
              className={classes.button}
              classes={{ sizeSmall: classes.buttonSizeSmall }}
              size="small"
              onClick={() => this.changeSort(reviews, 'dateAdded')}
              disabled={sort === 'dateAdded'}
            >
              날짜순
            </Button>
            <Button
              className={classes.button}
              classes={{ sizeSmall: classes.buttonSizeSmall }}
              size="small"
              onClick={() => this.changeSort(reviews, 'score')}
              disabled={sort === 'score'}
            >
              평점순
            </Button>
          </div>
          <Divider />
          <Fragment>
            {reviews == null && (
              <div className={classes.progressContainer}>
                <CircularProgress />
              </div>
            )}

            <div
              className={classes.productsSection}
              style={{ display: reviews == null ? 'none' : 'flex' }}
            >
              <Grid container spacing={8}>
                {reviews != null && this.renderList()}
              </Grid>
            </div>
          </Fragment>
        </div>
        {this.renderSnackBar()}
      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 4
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: 'auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonSizeSmall: {
    padding: '7px 4px',
    height: 24
  },
  progressContainer: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    height: '100%',
    width: '100%',
    zIndex: 9999
  },
  productsSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(MyBarPage);
