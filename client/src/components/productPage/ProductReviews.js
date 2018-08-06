import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import Rating from 'react-rating';
import { ThumbUp, Star, StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core';

class ProductReviews extends Component {
  constructor(props) {
    super(props);

    this.productId = props.productId;
    this.hasReview = null;
  }

  renderReviews() {
    const { reviews, classes } = this.props;

    if (this.hasReview) {
      return _.map(reviews, item => {
        const Content = () => (
          <Paper classname={classes.content} elevation={0}>
            <Typography variant="subheading">
              {item.userId.name}
              <Rating
                readonly
                initialRating={parseInt(item.score)}
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
            </Typography>
            <Typography variant="body1" component="p">
              {item.comment}
            </Typography>
          </Paper>
        );

        const Footer = () => (
          <Typography className={classes.footer} variant="caption">
            {item.dateAdded}
          </Typography>
        );

        return (
          <ListItem key={item._id} divider disableGutters>
            <ListItemText
              disableTypography
              primary={<Content />}
              secondary={<Footer />}
            />
            <ListItemSecondaryAction>
              <IconButton>
                <ThumbUp style={{ fontSize: 18 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    } else {
      return (
        <Typography variant="subheading">
          아직 사용자들의 리뷰가 없습니다.
        </Typography>
      );
    }
  }

  render() {
    const { classes } = this.props;
    this.hasReview = this.props.reviews.length != 0 ? true : false;

    return (
      <div className={classes.container}>
        <List className={classes.list} dense>
          {this.renderReviews()}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%'
  },
  list: {
    margin: theme.spacing.unit
  },
  content: {
    minHeight: 48
  },
  footer: {
    marginTop: theme.spacing.unit * 2
  },
  starIcon: {
    fontSize: 16,
    marginBottom: '-2px'
  }
});

export default withStyles(styles)(ProductReviews);
