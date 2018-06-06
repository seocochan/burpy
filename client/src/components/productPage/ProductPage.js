import React, { Component } from 'react';
import axios from 'axios';
import WishButton from './WishButton';
import MyReview from './MyReview';
import ProductReviews from './ProductReviews';
import category from '../../productCategoryDict';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };

    this.productId = props.match.params.id;
  }

  componentDidMount() {
    axios.get(`/api/product/${this.productId}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  renderBasicInfos() {
    const { product } = this.state;

    return (
      <div>
        <h3>상품 조회 페이지</h3>
        <div>
          <ul>
            <li>{product.name}</li>
            <li>{product.category}</li>
            <WishButton productId={this.productId} />
            <hr />
            <h4>상품 정보</h4>
            <li>{product.details}</li>
            <hr />
            <MyReview productId={this.productId} />
            <ProductReviews productId={this.productId} />
          </ul>
        </div>
      </div>
    );
  }

  renderTastes() {
    const { product } = this.state;
    const taste = category[product.category].params;

    return taste.map((item, i) => {
      return <li key={i}>{item}: {product.avgTaste[i]}</li>;
    });
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        {product && this.renderBasicInfos()}
        <ul>{product && this.renderTastes()}</ul>
      </div>
    );
  }
}

export default ProductPage;
