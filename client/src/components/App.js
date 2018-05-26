import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import SearchResult from './SearchResult';
import Wishlist from './Wishlist';
import MyProducts from './MyProducts';
import ProductPage from './productPage/ProductPage';
import NewProduct from './productEdit/NewProduct';
import EditProduct from './productEdit/EditProduct';
import NewReview from './reviewEdit/NewReview';
import EditReview from './reviewEdit/EditReview';
import Myinfo from './Info/Myinfo';
import Editmyinfo from './Info/Editmyinfo';
import EditGender from './Info/EditGender';
import EditBirthday from './Info/EditBirthday';

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
            <Route exact path="/new/product" component={NewProduct} />
            <Route exact path="/edit/product/:id" component={EditProduct} />
            <Route exact path="/new/review/:id" component={NewReview} />
            <Route exact path="/edit/review/:id" component={EditReview} />
            <Route exact path="/myinfo" component={Myinfo}/>
            <Route exact path="/edit/name/:id" component={Editmyinfo}/>
            <Route exact path="/edit/gender/:id" component={EditGender}/>
            <Route exact path="/edit/Birthday/:id" component={EditBirthday}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
