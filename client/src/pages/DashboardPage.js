import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class DashboardPage extends Component {
  render() {
    return (
      <Fragment>
        <h3>메인화면</h3>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DashboardPage);
