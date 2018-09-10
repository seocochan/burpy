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
  CircularProgress
} from '@material-ui/core';

class MyBarPage extends Component {
  constructor(props) {
    super(props);
    this.state = { reviews: null, sort: 'score' };

    this.handleDelete = this.handleDelete.bind(this);
    this.sortChange = this.sortChange.bind(this);
  }

  async componentDidMount() {
    const reviews = await axios.get('/api/review');

    const sorted = reviews.data.concat().sort((a, b) => {
      if (a.dateAdded > b.dateAdded) {
        return -1;
      }

      if (a.dateAdded < b.dateAdded) {
        return 1;
      }

      return 0;
    });

    this.setState({ reviews: sorted });
  }

  async handleDelete(id) {
    // 버그로 인해 임시 제외
    // const res = await axios.delete(`/api/review/${id}`);
    // if (res.status === 200) {
    //   const newReviews = _.filter(this.state.reviews, item => {
    //     return !(item._id === res.data);
    //   });
    //   this.setState({ reviews: newReviews });
    // }

    // FIXME: 위의 코드 버그 수정 후 아래의 테스트용 코드 제거
    const newReviews = _.filter(this.state.reviews, item => {
      return !(item._id === id);
    });
    this.setState({ reviews: newReviews });
  }

  sortChange() {
    if (this.state.sort == 'dateAdded') {
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.dateAdded > b.dateAdded) {
          return -1;
        }

        if (a.dateAdded < b.dateAdded) {
          return 1;
        }

        return 0;
      });

      this.setState({ reviews: sorted, sort: 'score' });
    } else if (this.state.sort == 'score') {
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }

        if (a.score < b.score) {
          return 1;
        }

        return 0;
      });

      this.setState({ reviews: sorted, sort: 'dateAdded' });
    }
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
          />
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { reviews, sort } = this.state;

    return (
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
            onClick={() => this.sortChange()}
            disabled={sort === 'score'}
          >
            날짜순
          </Button>
          <Button
            className={classes.button}
            classes={{ sizeSmall: classes.buttonSizeSmall }}
            size="small"
            onClick={() => this.sortChange()}
            disabled={sort === 'dateAdded'}
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
