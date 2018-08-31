import _ from 'lodash';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Divider,
  Grid,
  CircularProgress
} from '@material-ui/core';

/**
 * TODO:
 * - 카드 작성
 *   - 출력할 요소:
 *     - 상품: productId._id, name, category, imageUrl
 *     - 리뷰: .comment, score
 *   - 삭제 / 수정 버튼 지우기? 출력?
 */

class MyBarPage extends Component {
  constructor(props) {
    super(props);
    this.state = { reviews: null };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  async componentDidMount() {
    const reviews = await axios.get('/api/review');
    this.setState({ reviews: reviews.data });
  }

  async handleDelete(id) {
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      const newReviews = _.filter(this.state.reviews, item => {
        return !(item._id === res.data);
      });
      this.setState({ reviews: newReviews });
    }
  }

  handleModify(id) {
    this.props.history.push(`/edit/review/${id}`);
  }

  renderList() {
    const { reviews } = this.state;
    console.log(reviews);

    return _.map(reviews, item => {
      return (
        <li key={item._id}>
          <Link to={`/product/${item.productId._id}`}>
            {item.productId.name}
          </Link>
          내 평점: {item.score}
          코멘트: {item.comment}
          <button onClick={() => this.handleDelete(item._id)}>삭제</button>
          <button onClick={() => this.handleModify(item._id)}>수정</button>
        </li>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { reviews } = this.state;
    console.log(reviews);

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
          >
            날짜순
          </Button>
          <Button
            className={classes.button}
            classes={{ sizeSmall: classes.buttonSizeSmall }}
            size="small"
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
              {/* reviews != null && this.renderList() */}
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
