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
    const { classes, onDelete } = this.props;
    const { _id, name, category, avgScore, imageUrl } = this.props.product;
    const { date } = this.props.date
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imageUrl ? s3Url + imageUrl : noImage}
            title={name}
            component={Link}
            to={`/product/${_id}`}
          />
          <div>
            <CardContent>
              <div className={classes.subContainer}>
                <div className={classes.text}>
                  <Typography variant="caption" component="p">
                    {category}
                  </Typography>
                </div>
                <Typography variant="caption">
                  {date.substring(0, 10)}
                </Typography>
              </div>
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
              <Button
                size="small"
                color="primary"
                onClick={() => onDelete(_id)}
              >
                삭제
              </Button>
              <Button
                variant="flat"
                size="small"
                color="secondary"
                component={Link}
                to={`/product/${_id}`}
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
    margin: theme.spacing.unit
  },
  card: {},
  media: {
    paddingTop: '66%'
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit,
    marginLeft: 'auto'
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginRight: 'auto'
  }
});

export default withStyles(styles)(ProductCard);
