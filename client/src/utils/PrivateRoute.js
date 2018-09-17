import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  // pending
  if (auth == null) {
    return <div />;
  }
  // not logged in
  else if (auth === false) {
    return <Route {...rest} render={() => <Redirect to="/" />} />;
  }
  // logged in
  else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PrivateRoute);
