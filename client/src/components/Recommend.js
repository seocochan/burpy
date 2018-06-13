import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import category from '../productCategoryDict';

class Recommend extends Component {
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
        // FIX: 3개가 아니라 전체를 돌도록 수정(백엔드에서 3개로 제한할 예정)
        for (let i = 0; i < 3; i++) {
          const item = recommended[c.eng][i];

          // FIX: item의 이름도 출력하도록 수정
          itemList.push(<li key={item.id}>{item.score}</li>);
        }

        return (
          <div key={c.eng}>
            <h2>{c.eng}</h2>
            <ul>{itemList}</ul>
          </div>
        );
      } else {
        return (
          <div key={c.eng}>
            <h2>{c.eng}</h2>
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

export default Recommend;
