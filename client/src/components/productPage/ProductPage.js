import React, { Component } from 'react';
import axios from 'axios';
import WishButton from './WishButton';
import MyReview from './MyReview';
import ProductReviews from './ProductReviews';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };

    this.productId = props.match.params.id;
  }

  componentDidMount() {
    // const { id } = this.props.match.params;
    axios.get(`/api/product/${this.productId}`).then(res => {
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
            <WishButton productId={this.productId} />
            <hr />
            <h4>상품 정보</h4>
            <li>{this.state.product.details}</li>
            <hr />
            <MyReview productId={this.productId} />
            <ProductReviews productId={this.productId} />
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductPage;
