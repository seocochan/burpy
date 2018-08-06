import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { Create, Edit, Delete, Star, StarBorder } from '@material-ui/icons';
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

class MyReview extends Component {
  constructor(props) {
    super(props);

    this.productId = props.productId;
    this.tasteNames = category[this.props.category].params;
    this.reviewId = null;
    this.hasReview = null;
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(id) {
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      this.props.onDelete();
    }
  }

  renderMyReview() {
    const { classes, myReview, category } = this.props;

    const Content = () => (
      <Paper className={classes.content} elevation={0}>
        <Typography variant="subheading" gutterBottom>
          {myReview.userId.name}
          <Rating
            readonly
            initialRating={parseInt(myReview.score)}
            fullSymbol={
              <Star className={classes.starIcon} nativeColor="#ffda00" />
            }
            emptySymbol={
              <StarBorder className={classes.starIcon} nativeColor="#ffed87" />
            }
          />
        </Typography>
        <Typography variant="body1">{myReview.comment}</Typography>
      </Paper>
    );

    const Footer = () => (
      <Typography className={classes.footer} variant="caption">
        {myReview.dateAdded.substring(0, 10)} |{' '}
        {myReview.taste
          .map((value, i) => `${this.tasteNames[i]}: ${value}`)
          .join(', ')}
      </Typography>
    );

    return (
      <List className={classes.list} dense>
        <ListItem disableGutters>
          <ListItemText
            disableTypography
            primary={<Content />}
            secondary={<Footer />}
          />
          <ListItemSecondaryAction className={classes.buttonContainer}>
            <IconButton
              aria-label="Delete"
              onClick={() => this.handleDelete(myReview._id)}
            >
              <Delete className={classes.icon} />
            </IconButton>
            <IconButton
              aria-label="Edit"
              component={Link}
              to={`/edit/review/${this.reviewId}`}
            >
              <Edit className={classes.icon} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }

  render() {
    const { myReview, classes } = this.props;
    this.hasReview = _.isEmpty(myReview) ? false : true;
    this.hasReview && (this.reviewId = myReview._id);

    if (this.hasReview) {
      return (
        <div className={classes.container}>
          <Typography variant="subheading">내 리뷰</Typography>
          {this.renderMyReview()}
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
          <Button
            className={classes.writeButton}
            variant="outlined"
            component={Link}
            to={`/new/review/${this.productId}`}
          >
            <Create className={classes.writeIcon} />
            리뷰 작성
          </Button>
        </div>
      );
    }
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    margin: theme.spacing.unit,
    minHeight: 56
  },
  list: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  writeButton: {
    float: 'right',
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2
  },
  writeIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  icon: {
    fontSize: 20
  }
});

export default withStyles(styles)(MyReview);
