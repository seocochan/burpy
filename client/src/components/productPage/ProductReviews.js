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
  IconButton,
  Button
} from '@material-ui/core';
import category from '../../assets/datas/productCategoryDict';

class ProductReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { sort: props.recentSort };

    this.productId = props.productId;
    this.tasteNames = category[this.props.category].params;
    this.hasReview = null;
  }

  renderReviews() {
    const { reviews, classes } = this.props;

    if (this.hasReview) {
      return _.map(reviews, item => {
        const Content = () => (
          <Paper className={classes.content} elevation={0} square>
            <Typography variant="subheading" gutterBottom>
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
            <Typography variant="body1">{item.comment}</Typography>
          </Paper>
        );

        const Footer = () => (
          <Typography className={classes.footer} variant="caption">
            {item.taste
              .map((value, i) => `${this.tasteNames[i]}: ${value}`)
              .join(', ')}
            <br />
            {item.dateAdded.substring(0, 10)}
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
                <ThumbUp className={classes.icon} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    } else {
      return (
        <Typography variant="body1">
          <em>"아직 사용자들의 리뷰가 없습니다."</em>
        </Typography>
      );
    }
  }

  onClickSort(standard) {
    const { onSortChange } = this.props;

    onSortChange(standard);
    this.setState({ sort: standard });
  }

  render() {
    const { classes } = this.props;
    const { sort } = this.state;

    this.hasReview = this.props.reviews.length != 0 ? true : false;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="subheading">
            리뷰
          </Typography>
          <Button
            classes={{ sizeSmall: classes.button }}
            size="small"
            disabled={sort === 'score'}
            onClick={this.onClickSort.bind(this, 'score')}
          >
            평점순
          </Button>
          <Button
            classes={{ sizeSmall: classes.button }}
            size="small"
            color="primary"
            disabled={sort === 'dateAdded'}
            onClick={this.onClickSort.bind(this, 'dateAdded')}
          >
            최신순
          </Button>
        </div>
        <List className={classes.list} dense>
          {this.renderReviews()}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: theme.spacing.unit
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  title: {
    marginRight: 'auto'
  },
  button: {
    minWidth: 48,
    minHeight: 24,
    padding: 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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
  },
  icon: {
    fontSize: 20
  }
});

export default withStyles(styles)(ProductReviews);
