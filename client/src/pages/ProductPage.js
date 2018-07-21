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
        <div className={classes.productInfo}>
          <ProductInfo productId={productId} />
          <hr />
        </div>
        <div className={classes.myReview}>
          <MyReview productId={productId} />
        </div>
        <div className={classes.productReviews}>
          <ProductReviews productId={productId} />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  // https://github.com/topheman/npm-registry-browser/blob/master/src/components/Package/Package.js
  container: {
    display: 'grid',
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "90vw",
      gridTemplateAreas: `"pi"
      "mr"
      "pr"`
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 260px",
      gridTemplateAreas: `"pi pi pi"
      "mr pr pr"`
    },
    margin: theme.spacing.unit
  },
  productInfo: {
    gridArea: 'pi'
  },
  myReview: {
    gridArea: 'mr'
  },
  productReviews: {
    gridArea: 'pr'
  }
});

export default withStyles(styles)(ProductPage);
