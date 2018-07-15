import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../actions';
import queryString from 'qs';
import withStyles from 'material-ui/styles/withStyles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

class SearchResult extends Component {
  // 이 컴포넌트가 mount, update 됐을 때 url 쿼리를 값으로 가져오는 함수.
  setQueryToParams(props) {
    this.query = props.location.search;
    const parsed = queryString.parse(this.query, { ignoreQueryPrefix: true });

    this.word = parsed.q || ''; // 검색어
    this.order = parsed.order || ''; // 정렬 기준
    this.category = parsed.category || ''; // 분류 필터
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
    // isEqual()은 원소가 같은 배열도 순서가 다르면 다른 것으로 인식하기 때문에 sort() 필요
    // sort()는 원본을 바꾸기 때문에 slice()로 복제한 배열을 참조
    const a = _.isEqual(
      nextProps.searchResult.slice().sort(),
      this.props.searchResult.slice().sort()
    );

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

  componentWillUnmount() {
    // TODO: 여기에 searchResult를 비우는 액션 호출 (정의 필요)
  }

  onClickSort(standard) {
    this.props.history.push(
      `/search?q=${this.word}&order=${standard}&category=${this.category}`
    );
  }

  onChangeCategory(e) {
    this.props.history.push(
      `/search?q=${this.word}&order=${this.order}&category=${e.target.value}`
    );
  }

  renderList() {
    return _.map(this.props.searchResult, item => {
      return (
        <li key={item._id}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
          평점: {item.avgScore}
        </li>
      );
    });
  }

  renderSortButtons() {
    return (
      <div>
        <button onClick={this.onClickSort.bind(this, 'name')}>이름순</button>
        <button onClick={this.onClickSort.bind(this, 'avgScore')}>
          평점순
        </button>
      </div>
    );
  }

  renderCategoryFilter() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="category">분류</InputLabel>
          <Select
            value={this.category || ''}
            onChange={this.onChangeCategory.bind(this)}
          >
            <MenuItem value={''}>
              <em>전체</em>
            </MenuItem>
            <MenuItem value={'맥주'}>맥주</MenuItem>
            <MenuItem value={'위스키'}>위스키</MenuItem>
            <MenuItem value={'기타 주류'}>기타 주류</MenuItem>
            <MenuItem value={'탄산 음료'}>탄산 음료</MenuItem>
            <MenuItem value={'커피'}>커피</MenuItem>
            <MenuItem value={'기타 음료'}>기타 음료</MenuItem>
          </Select>
          <FormHelperText>원하는 분류를 선택하세요</FormHelperText>
        </FormControl>
      </form>
    );
  }

  render() {
    return (
      <Fragment>
        <h3>"{this.word}" 검색 결과</h3>
        {this.renderCategoryFilter()}
        {this.renderSortButtons()}
        <ul>{this.renderList()}</ul>
        <p />
        <Link to="/new/product">상품 등록하기</Link>
      </Fragment>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: '9rem',
    minWidth: 180
  }
});

function mapStateToProps({ searchResult }) {
  return { searchResult };
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      actions
    )(SearchResult)
  )
);
