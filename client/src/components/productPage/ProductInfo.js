import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WishButton from './WishButton';
import category from '../../productCategoryDict';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    axios.get(`/api/product/${this.props.productId}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  renderBasicInfos() {
    const { product } = this.state;
    const { classes, productId } = this.props;

    return (
      <Fragment>
        <h3>상품 조회 페이지</h3>
        <div>
          <ul>
            <li>{product.name}</li>
            <li>{product.category}</li>
            <WishButton productId={productId} />
            <hr />
            <h4>상품 정보</h4>
            <IconButton
              aria-label="edit"
              component={Link}
              to={`/edit/product/${productId}`}
            >
              <Edit className={classes.icon} />
            </IconButton>
            <li>{product.details}</li>
            <li>{product.avgScore}</li>
          </ul>
        </div>
      </Fragment>
    );
  }

  renderTastes() {
    const { product } = this.state;
    const taste = category[product.category].params;

    return taste.map((item, i) => {
      return (
        <li key={i}>
          {item}: {product.avgTaste[i]}
        </li>
      );
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

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

export default withStyles(styles)(ProductInfo);
