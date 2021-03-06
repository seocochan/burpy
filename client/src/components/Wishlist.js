import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import WishlistCard from '../components/WishlistCard';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlist: [],
      sort: 'name'
    };

    this.changeSort = this.changeSort.bind(this);
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      const sorted = res.data.concat().sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }

        if (a.date < b.date) {
          return 1;
        }

        return 0;
      });

      this.setState({ wishlist: sorted, sort: 'name' });
    });

    this.props.fetchUser();
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  onDeleteClick(id) {
    axios.delete(`/api/wishlist/${id}`).then(() => this.fetchWishlist());
  }

  changeSort() {
    if (this.state.sort == 'date') {
      const sorted = this.state.wishlist.concat().sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }

        if (a.date < b.date) {
          return 1;
        }

        return 0;
      });

      this.setState({ wishlist: sorted, sort: 'name' });
    } else if (this.state.sort == 'name') {
      const sorted = this.state.wishlist.concat().sort((a, b) => {
        if (a.productId.name > b.productId.name) {
          return 1;
        }

        if (a.productId.name < b.productId.name) {
          return -1;
        }

        return 0;
      });

      this.setState({ wishlist: sorted, sort: 'date' });
    }
  }

  renderSortButtons() {
    const { sort } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button
          size="small"
          className={classes.sortButton}
          onClick={() => this.changeSort()}
          disabled={sort === 'date'}
        >
          이름순
        </Button>
        <Button
          size="small"
          className={classes.sortButton}
          onClick={() => this.changeSort()}
          disabled={sort === 'name'}
        >
          날짜순
        </Button>
      </div>
    );
  }

  renderList() {
    return _.map(this.state.wishlist, item => {
      return (
        <Grid key={item.productId._id} item lg={3} md={4} sm={6} xs={12}>
          <WishlistCard
            key={item.productId._id}
            product={item.productId}
            date={item}
            onDelete={id => {
              this.onDeleteClick(id);
            }}
          />
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="title" component="h2">
            Wishlist
          </Typography>
          <div className={classes.sortButton}>{this.renderSortButtons()}</div>
        </div>
        <Divider />
        <div>
          <Grid container spacing={8}>
            {this.renderList()}
          </Grid>
        </div>
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
  wishlistSection: {
    paddingTop: theme.spacing.unit * 2,
    margin: 'center'
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: 'auto'
  },
  sortButton: {
    margin: theme.spacing.unit
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 4
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(Wishlist)
);
