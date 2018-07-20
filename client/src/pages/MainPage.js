import React, { Component } from 'react';
import { connect } from 'react-redux';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';

class MainPage extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <Landing />;
      default:
        return <Dashboard />;
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MainPage);
