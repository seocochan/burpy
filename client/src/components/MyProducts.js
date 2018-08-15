import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: []
     };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  async componentDidMount() {
    const reviews = await axios.get('api/review?order=dateAdded');
    this.setState( { reviews : reviews.data } );
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
  async onclickSort(standard){
    const reviews = await axios.get(`/api/review?order=${standard}`);
    this.setState( { reviews : reviews.data } );
    console.log(reviews.data);
  
  }
  renderSortButton(){
    return(
      <div>
        <button onClick = {this.onclickSort.bind(this,'score')}>평점순</button>
        <button onClick = {this.onclickSort.bind(this,'dateAdded')}>날짜순</button>

      </div>
    )
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
