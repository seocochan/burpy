import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { Star, StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
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
            <CardContent
              className={classes.content}
              classes={{ root: classes.contentRoot }}
            >
              <Typography variant="caption" component="p">
                {category}
              </Typography>
              <Typography
                className={classes.name}
                gutterBottom
                variant="subheading"
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
          </div>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 120,
      margin: theme.spacing.unit / 2
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 140,
      margin: theme.spacing.unit / 2
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 180,
      margin: theme.spacing.unit
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 200,
      margin: theme.spacing.unit
    }
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: '125%'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '113%'
    }
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  contentRoot: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit / 2,
      '&:last-child': {
        paddingBottom: theme.spacing.unit / 2
      }
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit,
      '&:last-child': {
        paddingBottom: theme.spacing.unit
      }
    }
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  starIcon: {
    fontSize: 16
  }
});

export default withStyles(styles)(ProductCard);
