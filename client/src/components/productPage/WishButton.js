import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, CircularProgress, Snackbar } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: null, open: false };

    this.wishlist = [];
    this.handleClick = this.handleClick.bind(this, props.productId);
    this.currentState = null;
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
    const { isToggleOn } = this.state;
    this.currentState = isToggleOn;
    await this.setState({ isToggleOn: null });

    if (this.currentState) {
      await axios.post(`/api/wishlist/${id}`);
      this.setState({ isToggleOn: !this.currentState });
    } else {
      await axios.delete(`/api/wishlist/${id}`);
      this.fetchWishlist();
      this.setState({ isToggleOn: !this.currentState });
    }

    this.setState({ open: true });
  }

  renderSnackBar() {
    const { open, isToggleOn } = this.state;

    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => this.setState({ open: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id">
            {isToggleOn ? '찜 목록에서 제거!' : '찜 목록에 추가!'}
          </span>
        }
      />
    );
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
      <Fragment>
        <IconButton
          className={classes.iconButton}
          size="large"
          onClick={this.handleClick}
          disabled={isToggleOn == null}
        >
          {icon}
        </IconButton>
        {this.renderSnackBar()}
      </Fragment>
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
