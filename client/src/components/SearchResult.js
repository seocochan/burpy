<<<<<<< HEAD
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
=======
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
>>>>>>> seoco
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <h3>"{this.props.search}" 검색 결과</h3>
        <ul>{this.renderList()}</ul>
=======
        <h3>"{this.word}" 검색 결과</h3>
        <ul>{this.renderList()}</ul>
        필터적용시 URL 파라메터 변경 및 리렌더링 테스트
        <p />
        <button onClick={this.onClickSort.bind(this, 'name')}>이름순</button>
        <button onClick={this.onClickSort.bind(this, 'avgScore')}>평점순</button>
        <p />
        <button onClick={this.onClickFilter.bind(this)}>필터 테스트</button>
>>>>>>> seoco
      </div>
    );
  }
}

<<<<<<< HEAD
function mapStateToProps({ searchItems, search }) {
  return { searchItems, search };
}

export default connect(mapStateToProps, actions)(SearchResult);
=======
function mapStateToProps({ searchResult }) {
  return { searchResult };
}

export default withRouter(connect(mapStateToProps, actions)(SearchResult));
>>>>>>> seoco
