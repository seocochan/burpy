import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import SearchResult from './SearchResult';
import Wishlist from './Wishlist';
import MyProducts from './MyProducts';
import ProductPage from './ProductPage';
import ProductEdit from './productEdit/ProductEdit';

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
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/my-products" component={MyProducts} />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route exact path="/new/product" component={ProductEdit} />
            <Route exact path="/edit/product/:id" component={ProductEdit} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
