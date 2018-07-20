import React, { Component } from 'react';
import ProductInfo from '../components/productPage/ProductInfo';
import MyReview from '../components/productPage/MyReview';
import ProductReviews from '../components/productPage/ProductReviews';

class ProductPage extends Component {
  render() {
    const productId = this.props.match.params.id;

    return (
      <div>
        <ProductInfo productId={productId} />
        <hr />
        <MyReview productId={productId} />
        <ProductReviews productId={productId} />
      </div>
    );
  }
}

export default ProductPage;
