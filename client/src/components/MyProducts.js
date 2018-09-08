import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * TODO:
 * 초기 정렬 완료
 * state 1개로 통합 완료
 * 함수 1개로 통합 완료
 * wishlist 동일 완료
 */

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      sort : 'score',
      open : false
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
    console.log(id);
    this.props.history.push(`/edit/review/${id}`);
  }

  buttonOff() {
    if (this.state.sort =='date') {
      this.setState({
        open : true
      })
    }
  }
  sortChange(){
    console.log(this.state.sort)
    if(this.state.sort=='date'){
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.dateAdded > b.dateAdded) {
          return -1;
        }
        if (a.dateAdded < b.dateAdded) {
          return 1;
        }
        return 0;
      });
  
      this.setState({ reviews: sorted, sort : 'score', open : false });
    }
    else if(this.state.sort=='score'){
      const sorted = this.state.reviews.concat().sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        return 0;
      });
  
      this.setState({ reviews: sorted, sort : 'date', open : true });
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
        <button onClick={() => this.sortChange()} disabled={this.state.open}>평점순</button>
        <button onClick={() => this.sortChange()} disabled={!this.state.open}>날짜순</button>

      </div>
    )
  }

  render() {
    console.log(this.state.reviews);
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
