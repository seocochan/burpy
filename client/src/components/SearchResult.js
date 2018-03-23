import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import queryString from 'query-string';

// 쿼리 형태는 리디북스 참고

class SearchResult extends Component {
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    const word = parsed.q;

    // 검색바를 통하지 않고 URL에 직접 쿼리한 경우 처리
    if (word !== this.props.search) {
      this.props.updateSearch(word);
    } else {
      const query = { word: this.props.search }; // 검색어, 필터값을 담을 객체
      this.props.fetchSearchItems(query);
    }
  }

  componentDidUpdate() {
    const query = { word: this.props.search };
    this.props.fetchSearchItems(query);
  }

  componentWillUnmount() {
    this.props.updateSearch('');
  }

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
    return (
      <div>
        <h3>"{this.props.search}" 검색 결과</h3>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ searchItems, search }) {
  return { searchItems, search };
}

export default connect(mapStateToProps, actions)(SearchResult);
