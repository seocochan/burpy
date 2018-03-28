import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../actions';
import queryString from 'query-string';

class SearchResult extends Component {
  // 이 컴포넌트가 mount, update 됐을 때 url 쿼리를 값으로 가져오는 함수.
  setQueryToParams(props) {
    this.query = props.location.search;
    const parsed = queryString.parse(this.query);
    this.word = parsed.q; // 검색어
    this.order = parsed.order; // 정렬 기준
    this.filter = parsed.filter; // 기타 필터
  }

  componentWillMount() {
    this.setQueryToParams(this.props);
    this.props.fetchSearchItems(this.query);
  }

  // props가 변경될 때 수행되는 이벤트
  // URL 쿼리가 변경될 때 props도 변경됨
  componentWillReceiveProps(nextProps) {
    this.setQueryToParams(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 검색 결과 배열의 내용이나 순서가 변경되었는지 확인
    const a = _.isEqual(nextProps.searchResult.sort(), this.props.searchResult.sort());

    // URL 쿼리가 변경되었는지 확인
    const b = nextProps.location.search === this.props.location.search;

    if (a && b) {
      return false;
    } else {
      if (a) {
        this.props.fetchSearchItems(this.query);
      }
      return true;
    }
  }

  onClickSort(standard) {
    this.props.history.push(`/search?q=${this.word}&order=${standard}&filter=${this.filter}`);
  }

  onClickFilter() {
    this.props.history.push(`/search?q=${this.word}&order=${this.order}&filter=${true}`);
  }

  renderList() {
    console.log(this.props.searchResult);
    return _.map(this.props.searchResult, item => {
      return (
        <li key={item.productId}>
          <Link to={`/product/${item.productId}`}>{item.name}</Link>
          평점: {item.avgScore}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>"{this.word}" 검색 결과</h3>
        <ul>{this.renderList()}</ul>
        필터적용시 URL 파라메터 변경 및 리렌더링 테스트
        <p />
        <button onClick={this.onClickSort.bind(this, 'name')}>이름순</button>
        <button onClick={this.onClickSort.bind(this, 'avgScore')}>평점순</button>
        <p />
        <button onClick={this.onClickFilter.bind(this)}>필터 테스트</button>
      </div>
    );
  }
}

function mapStateToProps({ searchResult }) {
  return { searchResult };
}

export default withRouter(connect(mapStateToProps, actions)(SearchResult));
