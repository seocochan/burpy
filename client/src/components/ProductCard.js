import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import {
  Star,
  StarBorder,
  FavoriteBorder,
  MoreHoriz,
  Edit,
  Delete,
  Favorite
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from '@material-ui/core';
import noImage from '../assets/images/noImage.png';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: null };

    this.handleClick = this.handleClick.bind(this, this.props.product._id);
    this.currentState = null;
  }

  componentWillMount() {
    this.fetchList();
  }

  componentDidMount() {
    this.fetchList();
  }

  async handleClick(id) {
    const { isToggleOn } = this.state;
    this.currentState = isToggleOn;

    await this.setState({ isToggleOn: null });

    if (this.currentState) {
      await axios.post(`/api/wishlist/${id}`);
      this.setState({ isToggleOn: !this.currentState });
    } else {
      await axios.delete(`/api/wishlist/${id}`);
      this.fetchList();
      this.setState({ isToggleOn: !this.currentState })
    }

    this.props.onButtonClick(isToggleOn);
    this.props.fetchUser();
  }

  fetchList() {
    if (this.props.auth.wishlist !== []) {
      for (let i = 0; i < this.props.auth.wishlist.length; i++) {
        if (this.props.auth.wishlist[i].productId === this.props.product._id) {
          this.setState({ isToggleOn: false });
          break;
        }
      }
    }

    if (this.state.isToggleOn == null) {
      this.setState({ isToggleOn: true });
    }
  }

  render() {
    const { classes, product, review, onDeleteReview } = this.props;
    const { _id: productId, name, category, avgScore, imageUrl } = product;
    const { isToggleOn } = this.state;
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';

    let reviewId, score, comment, dateAdded;
    if (review) {
      ({ _id: reviewId, score, comment, dateAdded } = review);
    }
    let icon;
    if (isToggleOn === true) {
      icon = <FavoriteBorder className={classes.icon} />
    } else {
      icon = <Favorite className={classes.icon} />
    }

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imageUrl ? s3Url + imageUrl : noImage}
            title={name}
            component={Link}
            to={`/product/${productId}`}
          />
          <div className={classes.contentContainer}>
            <CardContent
              className={classes.content}
              classes={{ root: classes.cardContentRoot }}
            >
              <Typography variant="caption" component="p">
                {category}
              </Typography>
              <Typography
                className={classes.name}
                gutterBottom
                variant="title"
                component="h3"
              >
                {name}
              </Typography>
              <div className={classes.subContainer}>
                <div className={classes.rating}>
                  <Rating
                    readonly
                    initialRating={parseFloat(review ? score : avgScore)}
                    fullSymbol={
                      <Star
                        className={classes.starIcon}
                        nativeColor="#ffda00"
                      />
                    }
                    emptySymbol={
                      <StarBorder
                        className={classes.starIcon}
                        nativeColor="#ffed87"
                      />
                    }
                  />
                </div>
                {review && (
                  <Typography variant="caption">
                    {dateAdded.substring(0, 10)}
                  </Typography>
                )}
              </div>
              {review && (
                <Typography className={classes.comment} variant="body1">
                  {comment}
                </Typography>
              )}
            </CardContent>
            <CardActions className={classes.actions}>
              {review ? (
                <Fragment>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Edit"
                    component={Link}
                    to={`/edit/review/${reviewId}`}
                  >
                    <Edit className={classes.icon} />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Delete"
                    onClick={() => onDeleteReview(reviewId)}
                  >
                    <Delete className={classes.icon} />
                  </IconButton>
                </Fragment>
              ) : (
                  <Fragment>
                    <IconButton
                      className={classes.iconButton}
                      aria-label="Favorite"
                      onClick={this.handleClick}
                    >
                      {icon}
                    </IconButton>
                    <IconButton
                      className={classes.iconButton}
                      component={Link}
                      to={`/product/${productId}`}
                    >
                      <MoreHoriz className={classes.icon} />
                    </IconButton>
                  </Fragment>
                )}
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: theme.spacing.unit
  },
  card: {
    display: 'flex'
  },
  media: {
    width: '33.333333%'
  },
  contentContainer: {
    width: '66.666666%',
    display: 'flex',
    flexDirection: 'column'
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  rating: {
    marginRight: 'auto'
  },
  cardContentRoot: {
    paddingBottom: 0
  },
  content: {
    flex: '1 0 auto'
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  comment: {
    display: '-webkit-box',
    width: '100%',
    minHeight: '3em',
    lineHeight: '1.5em',
    '-webkit-line-clamp': 2,
    '-moz-line-clamp': 2,
    '-ms-line-clamp': 2,
    '-o-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    '-moz-box-orient': 'vertical',
    '-ms-box-orient': 'vertical',
    '-o-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },
  starIcon: {
    fontSize: 16
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit
  },
  iconButton: {
    marginLeft: theme.spacing.unit
  },
  icon: {
    fontSize: 20
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(ProductCard)
);
