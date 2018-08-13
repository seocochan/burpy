import axios from 'axios';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, CircularProgress } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: null };

    this.wishlist = [];
    this.handleClick = this.handleClick.bind(this, props.productId);
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      this.wishlist = res.data;

      if (this.wishlist !== []) {
        for (let i = 0; i < this.wishlist.length; i++) {
          if (
            this.wishlist[i].productId._id === parseInt(this.props.productId)
          ) {
            this.setState({ isToggleOn: false });
            break;
          }
        }
      }
      if (this.state.isToggleOn == null) {
        this.setState({ isToggleOn: true });
      }
    });
  }

  async handleClick(id) {
    if (this.state.isToggleOn) {
      axios.post(`/api/wishlist/${id}`).then(res => {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
      });
    } else {
      axios.delete(`/api/wishlist/${id}`).then(() => {
        this.fetchWishlist();
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { isToggleOn } = this.state;

    let icon;
    if (isToggleOn == null) {
      icon = <CircularProgress size={24} color="secondary" />;
    } else if (isToggleOn == true) {
      icon = <FavoriteBorder className={classes.icon} />;
    } else {
      icon = <Favorite className={classes.icon} />;
    }

    return (
      <IconButton
        className={classes.iconButton}
        size="large"
        onClick={this.handleClick}
      >
        {icon}
      </IconButton>
    );
  }
}

const styles = theme => ({
  iconButton: {
    fontSize: 32,
    color: '#ec5252'
  },
  icon: {
    fontSize: 'inherit'
  }
});

export default withStyles(styles)(ToggleButton);
