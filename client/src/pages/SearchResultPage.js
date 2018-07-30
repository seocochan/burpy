import _ from 'lodash';
import queryString from 'qs';
import React, { Component } from 'react';
import category from '../productCategoryDict';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid
} from '@material-ui/core';

class SearchResultPage extends Component {
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
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProductCard key={item._id} product={item} />
        </Grid>
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

    let menuItems = [
      <MenuItem key="전체" value={''}>
        <em>전체</em>
      </MenuItem>
    ];
    for (const c of Object.keys(category)) {
      menuItems.push(
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      );
    }

    return (
      <form className={classes.filterForm} autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="category">분류</InputLabel>
          <Select
            value={this.category || ''}
            onChange={this.onChangeCategory.bind(this)}
          >
            {menuItems}
          </Select>
        </FormControl>
      </form>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography
          className={classes.title}
          variant="title"
          component="h2"
          gutterBottom
        >
          <span className={classes.titleSpan}>'{this.word}'</span>에 대한 검색
          결과
        </Typography>
        <div className={classes.controlSection}>
          {this.renderCategoryFilter()}
          {this.renderSortButtons()}
          <Link to="/new/product">상품 등록하기</Link>
        </div>
        <Divider />
        <div className={classes.productsSection}>
          <Grid container spacing={8}>
            {this.renderList()}
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: '90%',
    maxWidth: '1280px',
    margin: 'auto'
  },
  controlSection: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  productsSection: {
    paddingTop: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  titleSpan: {
    color: theme.palette.secondary.main
  },
  filterForm: {
    margin: theme.spacing.unit,
    width: '4rem'
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
    )(SearchResultPage)
  )
);
