import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ProductPage from './pages/ProductPage';
import RecommendPage from './pages/RecommendPage';
import MyBarPage from './pages/MyBarPage';
import NotFoundPage from './pages/NotFoundPage';

import Header from './components/Header';
import Wishlist from './components/Wishlist';
import NewProduct from './components/productEdit/NewProduct';
import EditProduct from './components/productEdit/EditProduct';
import NewReview from './components/reviewEdit/NewReview';
import EditReview from './components/reviewEdit/EditReview';
import MyInfo from './components/userInfo/MyInfo';
import MyInfoEditor from './components/userInfo/MyInfoEditor';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <BrowserRouter>
          <div className={classes.root}>
            <Header />
            <div className={classes.content}>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/search" component={SearchResultPage} />
                <Route exact path="/recommend" component={RecommendPage} />
                <Route exact path="/wishlist" component={Wishlist} />
                <Route exact path="/my-bar" component={MyBarPage} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/new/product" component={NewProduct} />
                <Route exact path="/edit/product/:id" component={EditProduct} />
                <Route exact path="/new/review/:id" component={NewReview} />
                <Route exact path="/edit/review/:id" component={EditReview} />
                <Route exact path="/my-info" component={MyInfo} />
                <Route exact path="/edit/my-info/:id" component={MyInfoEditor} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 56px)',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit + 56
  }
});

export default withRoot(
  withStyles(styles)(
    connect(
      null,
      actions
    )(App)
  )
);
