import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import category from '../assets/datas/productCategoryDict';

class RecommendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommended: null
    };
  }

  async componentDidMount() {
    const res = await axios.get('api/recommend');
    this.setState({ recommended: res.data });
  }

  renderList() {
    const { recommended } = this.state;

    return _.map(category, c => {
      if (recommended.hasOwnProperty(c.eng) && recommended[c.eng]) {
        let itemList = [];

        recommended[c.eng].forEach(item => {
          itemList.push(
            <li key={item.id}>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              {` / 예상 평점: ${item.score}`}
            </li>);
        });

        return (
          <div key={c.eng}>
            <h2>{c.kor}</h2>
            <ul>{itemList}</ul>
          </div>
        );
      } else {
        return (
          <div key={c.eng}>
            <h2>{c.kor}</h2>
            <ul>아직 추천 상품이 없습니다. 더 많은 리뷰를 등록하세요.</ul>
          </div>
        );
      }
    });
  }

  render() {
    const { recommended } = this.state;

    return (
      <div>
        <h2>추천 상품 목록</h2>
        {recommended && this.renderList()}
      </div>
    );
  }
}

export default RecommendPage;
