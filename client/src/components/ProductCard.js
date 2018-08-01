import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { Star, StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core';
import noImage from '../assets/images/noImage.png';

class ProductCard extends Component {
  render() {
    const { classes } = this.props;
    const { _id: id, name, category, avgScore, imageUrl } = this.props.product;
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imageUrl ? s3Url + imageUrl : noImage}
            title={name}
            component={Link}
            to={`/product/${id}`}
          />
          <div className={classes.contentContainer}>
            <CardContent className={classes.content}>
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
              <Rating
                readonly
                initialRating={parseFloat(avgScore)}
                fullSymbol={
                  <Star className={classes.starIcon} nativeColor="#ffda00" />
                }
                emptySymbol={
                  <StarBorder
                    className={classes.starIcon}
                    nativeColor="#ffed87"
                  />
                }
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" disabled>
                찜
              </Button>
              <Button
                variant="flat"
                size="small"
                color="secondary"
                component={Link}
                to={`/product/${id}`}
              >
                더보기
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    maxHeight: 160,
    margin: theme.spacing.unit
  },
  card: {
    display: 'flex'
  },
  media: {
    width: '33.333333%'
    // height: 0, // 세로
    // paddingTop: '150%' // 2:3 // 세로
  },
  contentContainer: {
    width: '66.666666%',
    display: 'flex',
    flexDirection: 'column'
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
  starIcon: {
    fontSize: 16
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(ProductCard);
