import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: [],
      date : true,
      score : false
     };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.scoreSort = this.scoreSort.bind(this);
    this.dateSort = this.dateSort.bind(this);
  }

  async componentDidMount() {
    const reviews = await axios.get('api/review');
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

  buttonOff(){
    if(this.state.date){
      this.setState({
        date : false,
        score : true
      })
    }
    else{
      this.setState({
        date : true,
        score : false
      })
    }
  }

  scoreSort() {
    this.setState(
      this.state.reviews.sort((a,b)=>{
        if(a.productId.name > b.productId.name){
          return 1;
        }
        if(a.productId.name < b.productId.name){
          return -1;
        }
        return 0;
      })
    )
    this.buttonOff();
  }
  dateSort() {
    this.setState(
      this.state.reviews.sort((a,b)=>{
        if(a.dateAdded > b.dateAdded){
          return -1;
        }
        if(a.dateAdded < b.dateAdded){
          return 1;
        }
        return 0;
      })
    )
    this.buttonOff();
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
  renderSortButton(){
    return(
      <div>
        <button onClick = {()=>this.scoreSort()} disabled={this.state.score}>평점순</button>
        <button onClick = {()=>this.dateSort()} disabled={this.state.date}>날짜순</button>

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
