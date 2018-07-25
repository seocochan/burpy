import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import TextViewer from './TextViewer';

class ProductDetails extends Component {
  renderDetails() {
    const { classes, productId, product } = this.props;

    return (
      <Fragment>
        <h4>상품 상세 정보</h4>
        <IconButton
          aria-label="edit"
          component={Link}
          to={`/edit/product/${productId}`}
        >
          <Edit className={classes.icon} />
        </IconButton>
        수정하기
        <TextViewer value={product.details} />
      </Fragment>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return <Fragment>{this.renderDetails()}</Fragment>;
  }
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

export default withStyles(styles)(ProductDetails);
