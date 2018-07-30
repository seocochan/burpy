import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { product } = this.props;

    return (
      <Fragment>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <p>평점: {product.avgScore}</p>
      </Fragment>
    );
  }
}

export default ProductCard;
