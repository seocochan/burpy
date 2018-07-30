import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import category from '../../productCategoryDict';

class ProductTastesInfo extends Component {
  renderTastes() {
    const { product } = this.props;
    const taste = category[product.category].params;
    
    const tasteList = taste.map((item, i) => {
      return (
        <li key={i}>
          {item}: {product.avgTaste[i]}
        </li>
      );
    });

    return (
      <Fragment>
        <h4>맛 수치 정보</h4>
        <ul>{tasteList}</ul>
      </Fragment>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return <Fragment>{this.renderTastes()}</Fragment>;
  }
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

export default withStyles(styles)(ProductTastesInfo);
