import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../actions';
import queryString from 'query-string';

// 쿼리 형태는 리디북스 참고

class SearchResult extends Component {
  setQueryToParams(props) {
    this.query = props.location.search;
    const parsed = queryString.parse(this.query);
    this.word = parsed.q;
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
    // 검색 URL 쿼리가 변경되었을 때, 혹은
    // searchResult가 변경되었을 때 리렌더링

    const a = _.isEqual(nextProps.searchResult, this.props.searchResult);
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

  onClick(value) {
    this.props.history.push(`/search?q=${value}&p=123`);
    // p=임의의 파라메터
  }

  renderList() {
    return _.map(this.props.searchResult, item => {
      return (
        <li key={item.productId}>
          <Link to={`/product/${item.productId}`}>{item.name}</Link>
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
        <button onClick={this.onClick.bind(this, this.word)}>필터</button>
      </div>
    );
  }
}

function mapStateToProps({ searchResult }) {
  return { searchResult };
}

export default withRouter(connect(mapStateToProps, actions)(SearchResult));
