import React, { Component } from 'react';
import axios from 'axios';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: Boolean
    };
    this.wishlist = [];
    this.handleClick = this.handleClick.bind(this, props.value.id);
  }

  componentWillMount() {
    this.fetchWishlist();
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      this.wishlist = res.data;
      if (this.wishlist !== []) {
        for (var i = 0; i < this.wishlist.length; i++) {
          if (this.wishlist[i].productId._id == this.props.value.id) {
            this.setState({ isToggleOn: false });
          } else {
            this.setState({ isToggleOn: true });
          }
        }
      }
    });
  }

  handleClick(id) {
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
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? '찜목록추가' : '이미추가됨'}
      </button>
    );
  }
}

export default ToggleButton;
