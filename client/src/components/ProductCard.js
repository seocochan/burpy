import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import {
  Star,
  StarBorder,
  FavoriteBorder,
  MoreHoriz,
  Edit,
  Delete
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

class ProductCard extends Component {
  render() {
    const { classes, product, review, onDeleteReview } = this.props;
    const { _id: productId, name, category, avgScore, imageUrl } = product;
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';

    let reviewId, score, comment, dateAdded;
    if (review) {
      ({ _id: reviewId, score, comment, dateAdded } = review);
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
                  >
                    <FavoriteBorder className={classes.icon} />
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

export default withStyles(styles)(ProductCard);
