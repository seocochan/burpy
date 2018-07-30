import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core';

class ProductCard extends Component {
  render() {
    const { classes } = this.props;
    const {
      _id: id,
      name,
      category,
      avgScore,
      imageUrl = 'noimage.png'
    } = this.props.product;
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={s3Url + imageUrl}
            title={name}
          />
          <div className={classes.contentContainer}>
            <CardContent className={classes.content}>
              <Typography component="p">{category}</Typography>
              <Typography
                className={classes.name}
                gutterBottom
                variant="headline"
                component="h3"
              >
                {name}
              </Typography>
              <Typography component="p">평점: {avgScore.toFixed(1)}</Typography>
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(ProductCard);
