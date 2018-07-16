import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <h3>메인화면</h3>
        <SearchBar />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
