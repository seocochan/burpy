import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        메인화면
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(Dashboard);