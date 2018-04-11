import React, { Component } from 'react';
import axios from 'axios';
import ToggleButton from './ToggleButton';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/product/${id}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  render() {
    return (
      <div>
        <h3>상품 조회 페이지</h3>
        <div>
          <ul>
            <li>{this.state.product.name}</li>
            <li>{this.state.product.details}</li>
            <ToggleButton value={this.props.match.params} />
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductPage;
