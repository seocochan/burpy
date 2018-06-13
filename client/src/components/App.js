import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import SearchResult from './SearchResult';
import Recommend from './Recommend';
import Wishlist from './Wishlist';
import MyProducts from './MyProducts';
import ProductPage from './productPage/ProductPage';
import NewProduct from './productEdit/NewProduct';
import EditProduct from './productEdit/EditProduct';
import NewReview from './reviewEdit/NewReview';
import EditReview from './reviewEdit/EditReview';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={SearchResult} />
            <Route exact path="/recommend" component={Recommend} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/my-products" component={MyProducts} />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route exact path="/new/product" component={NewProduct} />
            <Route exact path="/edit/product/:id" component={EditProduct} />
            <Route exact path="/new/review/:id" component={NewReview} />
            <Route exact path="/edit/review/:id" component={EditReview} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
