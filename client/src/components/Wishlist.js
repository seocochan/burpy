import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
      name : false,
      date : true
    };
    this.nameSort = this.nameSort.bind(this);
    this.dateSort = this.dateSort.bind(this);
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      this.setState({ wishlist: res.data });
      console.log(res.data);
    });
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  onDeleteClick(id) {
    axios.delete(`/api/wishlist/${id}`).then(() => this.fetchWishlist());
  }

  buttonOff(){
    if(this.state.date){
      this.setState({
        date : false,
        name : true
      })
    }
    else{
      this.setState({
        date : true,
        name : false
      })
    }
  }

  nameSort() {
    this.setState(
      this.state.wishlist.sort((a,b)=>{
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
      this.state.wishlist.sort((a,b)=>{
        if(a.date > b.date){
          return -1;
        }
        if(a.date < b.date){
          return 1;
        }
        return 0;
      })
    )
    this.buttonOff();
  }

  renderSortButtons() {
    return (
      <div>
        <button onClick={()=>this.nameSort()} disabled={this.state.name}>이름순</button>
        <button onClick={()=>this.dateSort()} disabled={this.state.date}>날짜순</button>
      </div>
    );
  }


  renderList() {
    return _.map(this.state.wishlist, item => {
      return (
        <li key={item.productId}>
          <Link to={`/product/${item.productId._id}`}>
            {item.productId.name}
          </Link>
          <button onClick={this.onDeleteClick.bind(this, item.productId._id)}>
            삭제
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>찜한 상품 목록</h3>
        {this.renderSortButtons()}
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default Wishlist;
