import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      sort: 'score'
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.sortChange = this.sortChange.bind(this);
  }

  async componentDidMount() {
    const reviews = await axios.get('api/review');

    const sorted = reviews.data.concat().sort((a, b) => {
      if (a.dateAdded > b.dateAdded) {
        return -1;
      }

      if (a.dateAdded < b.dateAdded) {
        return 1;
      }

      return 0;
    });

    this.setState({ reviews: sorted });
  }

  async handleDelete(id) {
    const res = await axios.delete(`/api/review/${id}`);

    if (res.status === 200) {
      const newReviews = _.filter(this.state.reviews, item => {
        return !(item._id === res.data);
      });
      this.setState({ reviews: newReviews });
    }
  }

  handleModify(id) {
    this.props.history.push(`/edit/review/${id}`);
  }

  sortChange() {
    if (this.state.sort == 'date') {
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.dateAdded > b.dateAdded) {
          return -1;
        }

        if (a.dateAdded < b.dateAdded) {
          return 1;
        }

        return 0;
      });

      this.setState({ reviews: sorted, sort: 'score' });
    } else if (this.state.sort == 'score') {
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }

        if (a.score < b.score) {
          return 1;
        }

        return 0;
      });

      this.setState({ reviews: sorted, sort: 'date' });
    }
  }

  renderList() {
    return _.map(this.state.reviews, item => {
      return (
        <li key={item._id}>
          <Link to={`/product/${item.productId._id}`}>
            {item.productId.name}
          </Link>
          내 평점: {item.score}
          코멘트: {item.comment}
          <button onClick={() => this.handleDelete(item._id)}>삭제</button>
          <button onClick={() => this.handleModify(item._id)}>수정</button>
        </li>
      );
    });
  }
  renderSortButton() {
    return (
      <div>
        <button
          onClick={() => this.sortChange()}
          disabled={this.state.sort === 'date'}
        >
          평점순
        </button>
        <button
          onClick={() => this.sortChange()}
          disabled={this.state.sort === 'score'}
        >
          날짜순
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>내 상품</h3>
        {this.renderSortButton()}
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default MyProducts;
