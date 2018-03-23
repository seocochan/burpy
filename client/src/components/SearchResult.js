import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import queryString from 'query-string';

// 쿼리 형태는 리디북스 참고

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
  }

  componentDidMount() {
    this.forceUpdate();
    const parsed = queryString.parse(this.props.location.search);
    const word = parsed.q;
    this.setState({ word });

    const query = { word: word }; // 검색어, 필터값을 담을 객체
    // this.props.fetchSearchItems(query);
  }

  // TODO: 컴포넌트가 unmount 될 때 검색인풋의 값을 지우는 처리 추가

  renderList() {
    // DB 쿼리 액션의 결과로 갱신된 state를 리스트로 출력하는 함수
    return (
      <div>
        <li>hi</li>
        <li>hi</li>
      </div>
    );
  }


  render() {
    const { word } = this.state;

    return (
      <div>
        <h3>"{word}" 검색 결과</h3>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ searchItems }) {
  return { searchItems };
}

export default connect(mapStateToProps, actions)(SearchResult);
