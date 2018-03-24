import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductPage extends Component {
  render() {
    return (
      <div>
        <h3>상품 조회 페이지</h3>
        <div>
          <p>어쩌고 저쩌고</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //
  };
}

export default connect(mapStateToProps)(ProductPage);
