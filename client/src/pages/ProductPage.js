import React, { Component } from 'react';
import ProductInfo from '../components/productPage/ProductInfo';
import MyReview from '../components/productPage/MyReview';
import ProductReviews from '../components/productPage/ProductReviews';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

class ProductPage extends Component {
  render() {
    const productId = this.props.match.params.id;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.productInfo}>
          <ProductInfo productId={productId} />
        </Paper>
        <Paper className={classes.myReview}>
          <MyReview productId={productId} />
        </Paper>
        <Paper className={classes.productReviews}>
          <ProductReviews productId={productId} />
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  // https://github.com/topheman/npm-registry-browser/blob/master/src/components/Package/Package.js
  // https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
  container: {
    display: 'grid',
    gridGap: '16px',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '1280px',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '90vw',
      gridTemplateAreas: `"pi"
      "mr"
      "pr"`
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '3fr 1fr',
      gridTemplateAreas: `"pi mr"
      "pr mr"`
    }
  },
  productInfo: {
    gridArea: 'pi',
    padding: theme.spacing.unit
  },
  myReview: {
    gridArea: 'mr',
    padding: theme.spacing.unit,
    minWidth: '180px',
    maxHeight: '250px'
  },
  productReviews: {
    gridArea: 'pr',
    padding: theme.spacing.unit
  }
});

export default withStyles(styles)(ProductPage);
