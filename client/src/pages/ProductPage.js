import React, { Component } from 'react';
import ProductInfo from '../components/productPage/ProductInfo';
import MyReview from '../components/productPage/MyReview';
import ProductReviews from '../components/productPage/ProductReviews';
import { withStyles } from '@material-ui/core/styles';

class ProductPage extends Component {
  render() {
    const productId = this.props.match.params.id;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <ProductInfo productId={productId} />
        <hr />
        <MyReview productId={productId} />
        <ProductReviews productId={productId} />
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(ProductPage);
