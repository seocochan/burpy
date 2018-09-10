import _ from 'lodash';
import axios from 'axios';
import queryString from 'qs';
import React, { Component, Fragment } from 'react';
import category from '../assets/datas/productCategoryDict';
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
  Button,
  Typography,
  Divider,
  Grid,
  Zoom,
  CircularProgress,
  Snackbar
} from '@material-ui/core';

const SIZE_UNIT = 10;

class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextData: [],
      isPending: true,
      isInitFetchDone: false,
      open: false
    };

    this.isInitFetchDone = false;
    this.size = SIZE_UNIT * 2;
    this.count = 1;

    this.fetchMoreSearchItems = this.fetchMoreSearchItems.bind(this);
  }

  // 이 컴포넌트가 mount, update 됐을 때 url 쿼리를 값으로 가져오는 함수.
  setQueryToParams(props) {
    this.query = props.location.search;
    const parsed = queryString.parse(this.query, { ignoreQueryPrefix: true });

    this.word = parsed.q || ''; // 검색어
    this.category = parsed.category || 'all'; // 분류 필터
    this.order = parsed.order || 'name'; // 정렬 기준
  }

  async fetchMoreSearchItems(query, isInit = false) {
    const { fetchSearchItems, searchResult } = this.props;
    const { nextData, isInitFetchDone } = this.state;

    // 컴포넌트 마운트 or 정렬, 필터, 키워드가 바뀐 경우
    if (isInit) {
      if (isInitFetchDone) {
        await this.setState({ isInitFetchDone: false });
      }

      if (nextData.length !== 0) {
        // cdm 없이 첫번째 검색이 발생한 경우. pending
        await this.setState({ nextData: [] });
      }

      this.size = SIZE_UNIT * 2;
      this.count = 1;
      const res = await axios.get(
        `/api/search_result${query}&size=${this.size}&count=${this.count}`
      );
      fetchSearchItems(res.data.slice(0, SIZE_UNIT));
      await this.setState({
        isInitFetchDone: true,
        nextData: res.data.slice(SIZE_UNIT)
      });
    }
    // 더보기 버튼을 클릭한 경우
    else {
      fetchSearchItems([...searchResult, ...nextData]); // 기존 리스트에 다음 원소들을 누적
      // await this.setState({ nextData: [] }); // 다음 데이터를 기다리는 상태. pending

      await this.setState({ isPending: true });
      const res = await axios.get(
        `/api/search_result${query}&size=${this.size}&count=${this.count}`
      );
      await this.setState({ nextData: res.data });
    }

    await this.setState({ isPending: false });
    this.size = SIZE_UNIT;
    this.count++;
  }

  componentWillMount() {
    this.setQueryToParams(this.props);
    // this.props.fetchSearchItems(this.query);
    this.fetchMoreSearchItems(this.query, true);
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
    const isPendingStateSame = nextProps.isPending === this.state.isPending;

    const isNextDataSame = _.isEqual(
      nextState.nextData.slice().sort(),
      this.state.nextData.slice().sort()
    );

    if (!isNextDataSame) {
      return true;
    }

    const isSearchResultSame = _.isEqual(
      nextProps.searchResult.slice().sort(),
      this.props.searchResult.slice().sort()
    );

    // URL 쿼리가 변경되었는지 확인
    const isUrlSame = nextProps.location.search === this.props.location.search;

    if (isSearchResultSame && isUrlSame) {
      if (!isPendingStateSame) {
        return true;
      }
      return false;
    } else {
      if (isSearchResultSame) {
        this.fetchMoreSearchItems(this.query, true);
      }
      return true;
    }
  }

  componentWillUnmount() {
    // TODO: 여기에 searchResult를 비우는 액션 호출 (정의 필요)
  }

  onChangeCategory(e) {
    this.props.history.push(
      `/search?q=${this.word}&category=${e.target.value}&order=${this.order}`
    );
  }

  onChangeSort(e) {
    this.props.history.push(
      `/search?q=${this.word}&category=${this.category}&order=${e.target.value}`
    );
  }

  renderCategoryFilter() {
    const { classes } = this.props;

    let menuItems = [
      <MenuItem key="전체" value="all">
        전체
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
      <form autoComplete="off">
        <FormControl className={classes.filterForm}>
          <InputLabel htmlFor="category">분류</InputLabel>
          <Select
            value={this.category}
            onChange={this.onChangeCategory.bind(this)}
          >
            {menuItems}
          </Select>
        </FormControl>
      </form>
    );
  }

  renderSortSelect() {
    const { classes } = this.props;
    const sortList = [
      { name: '이름순', val: 'name' },
      { name: '평점순', val: 'avgScore' }
    ];

    let menuItems = [];
    sortList.forEach(({ name, val }) => {
      menuItems.push(
        <MenuItem key={name} value={val}>
          {name}
        </MenuItem>
      );
    });

    return (
      <form autoComplete="off">
        <FormControl className={classes.filterForm}>
          <InputLabel htmlFor="order">정렬</InputLabel>
          <Select value={this.order} onChange={this.onChangeSort.bind(this)}>
            {menuItems}
          </Select>
        </FormControl>
      </form>
    );
  }

  renderList() {
    return _.map(this.props.searchResult, item => {
      return (
        <Zoom key={item._id} in={Boolean(item)}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              key={item._id}
              product={item}
              onButtonClick={() => this.setState({ open: true })}
            />
          </Grid>
        </Zoom>
      );
    });
  }

  renderSnackBar() {
    const { open } = this.state;

    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => this.setState({ open: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">찜목록에 추가!</span>}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { nextData, isPending, isInitFetchDone } = this.state;

    return (
      <Fragment>
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
            <div className={classes.filterSection}>
              {this.renderCategoryFilter()}
              {this.renderSortSelect()}
            </div>
            <Button
              className={classes.newButton}
              size="small"
              component={Link}
              to="/new/product"
            >
              상품 등록
            </Button>
          </div>
          <Divider />
          <Fragment>
            {!isInitFetchDone && (
              <div className={classes.progressContainer}>
                <CircularProgress />
              </div>
            )}

            <div
              className={classes.productsSection}
              style={{ display: !isInitFetchDone ? 'none' : 'flex' }}
            >
              <Grid container spacing={8}>
                {this.renderList()}
              </Grid>
              {nextData.length !== 0 ? (
                <Button
                  className={classes.loadMoreButton}
                  variant="outlined"
                  onClick={() => this.fetchMoreSearchItems(this.query)}
                  disabled={isPending}
                >
                  {isPending ? <CircularProgress size={20} /> : '결과 더 보기'}
                </Button>
              ) : (
                <Button className={classes.loadMoreButton} disabled>
                  이게 다예요.
                </Button>
              )}
            </div>
          </Fragment>
        </div>
        {this.renderSnackBar()}
      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto'
  },
  controlSection: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    margin: theme.spacing.unit
  },
  filterSection: {
    display: 'flex',
    marginRight: 'auto'
  },
  progressContainer: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    height: '100%',
    width: '100%',
    zIndex: 9999
  },
  productsSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 2
  },
  loadMoreButton: {
    width: '70%',
    maxWidth: 600,
    height: 20,
    margin: 'auto',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  title: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit
  },
  titleSpan: {
    color: theme.palette.primary.light
  },
  filterForm: {
    margin: theme.spacing.unit,
    width: '7rem'
  },
  newButton: {
    margin: theme.spacing.unit
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
