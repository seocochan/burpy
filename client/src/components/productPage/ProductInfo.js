import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WishButton from './WishButton';
import TextViewer from './TextViewer';
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

    this.s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';
  }

  componentDidMount() {
    axios.get(`/api/product/${this.props.productId}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  renderBasicInfos() {
    const { product } = this.state;
    const { productId } = this.props;

    return (
      <Fragment>
        <h4>상품 기본 정보</h4>
        {product.imageUrl && (
          <img src={this.s3Url + product.imageUrl} width="200px" />
        )}
        <ul>
          <li>상품명: {product.name}</li>
          <li>종류: {product.category}</li>
          <li>평균 평점: {product.avgScore}</li>
        </ul>
        <WishButton productId={productId} />
      </Fragment>
    );
  }

  renderDetails() {
    const { product } = this.state;
    const { classes, productId } = this.props;

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

  renderTastes() {
    const { product } = this.state;

    const taste = category[product.category].params;
    const list = taste.map((item, i) => {
      return (
        <li key={i}>
          {item}: {product.avgTaste[i]}
        </li>
      );
    });

    return (
      <Fragment>
        <h4>맛 수치 정보</h4>
        <ul>{list}</ul>
      </Fragment>
    );
  }

  render() {
    const { product } = this.state;
    const { classes } = this.props;

    if (!product) {
      return <div />;
    }

    return (
      <Fragment>
        <h3>상품 조회 페이지</h3>
        {this.renderBasicInfos()}
        <hr />
        {this.renderDetails()}
        <hr />
        {this.renderTastes()}
      </Fragment>
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
