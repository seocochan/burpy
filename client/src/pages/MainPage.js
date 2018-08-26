import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import DashboardPage from './DashboardPage';

class MainPage extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <LandingPage />;
      default:
        return <DashboardPage />;
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
