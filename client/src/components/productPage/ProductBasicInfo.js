import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import WishButton from './WishButton';

class ProductBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';
  }

  renderBasicInfos() {
    const {
      productId,
      product: { name, category, shops = [], avgScore, imageUrl }
    } = this.props;

    return (
      <Fragment>
        <h4>상품 기본 정보</h4>
        {imageUrl && <img src={this.s3Url + imageUrl} width="200px" />}
        <ul>
          <li>상품명: {name}</li>
          <li>종류: {category}</li>
          <li>평균 평점: {avgScore}</li>
        </ul>
        <ul>
          판매처
          {shops.map(shop => <li key={shop}>{shop}</li>)}
        </ul>
        <WishButton productId={productId} />
      </Fragment>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return <Fragment>{this.renderBasicInfos()}</Fragment>;
  }
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

export default withStyles(styles)(ProductBasicInfo);
