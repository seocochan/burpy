import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ProductBasicInfo from '../components/productPage/ProductBasicInfo';
import ProductDetails from '../components/productPage/ProductDetails';
import ProductTastesInfo from '../components/productPage/ProductTastesInfo';
import ReviewStat from '../components/productPage/ReviewStat';
import MyReview from '../components/productPage/MyReview';
import ProductReviews from '../components/productPage/ProductReviews';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper, Divider } from '@material-ui/core';
import { InfoOutline, Toc } from '@material-ui/icons';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      myReview: {},
      reviews: [],
      tab: 'product'
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.fetchData(id);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;

    // 검색바를 통해 product 라우터의 id만 바뀐 경우,
    // 현재 state를 초기화 하고 다시 fetching
    if (id !== this.props.match.params.id) {
      this.setState({ product: null, myReview: {}, reviews: [] });
      this.fetchData(id);
    }
  }

  async fetchData(productId) {
    const product = await axios.get(`/api/product/${productId}`);
    this.setState({ product: product.data });

    const myReview = await axios.get(`/api/product/${productId}/my_review`);
    const reviews = await axios.get(`/api/product/${productId}/reviews`);
    this.setState({ myReview: myReview.data, reviews: reviews.data });
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  renderProductTab(productId, product) {
    return <ProductDetails productId={productId} product={product} />;
  }

  renderReviewTab(productId) {
    const { product, myReview, reviews } = this.state;

    return (
      product && (
        <Fragment>
          <ReviewStat product={product} />
          <Divider light />
          <MyReview
            productId={productId}
            category={product.category}
            myReview={myReview}
            onDelete={() => this.setState({ myReview: {} })}
          />
          <ProductReviews
            productId={productId}
            category={product.category}
            reviews={reviews}
          />
        </Fragment>
      )
    );
  }

  // 탭 스타일 override: https://material-ui.com/demos/tabs/#customized-tabs
  render() {
    const productId = this.props.match.params.id;
    const { product, tab } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.titleContainer}>
          <div className={classes.titleContent}>
            <ProductBasicInfo productId={productId} product={product} />
          </div>
        </div>
        <div className={classes.contentsContainer}>
          <Paper className={classes.productTastesInfo}>
            <ProductTastesInfo productId={productId} product={product} />
          </Paper>

          <Paper className={classes.contents}>
            <Tabs value={tab} onChange={this.handleTabChange}>
              <Tab
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabWrapper,
                  label: classes.tabLabel,
                  labelIcon: classes.tabLabelIcon
                }}
                value="product"
                label="상품 정보"
                icon={
                  <InfoOutline className={classes.tabIcon} color="primary" />
                }
              />
              <Tab
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabWrapper,
                  label: classes.tabLabel,
                  labelIcon: classes.tabLabelIcon
                }}
                value="review"
                label="리뷰"
                icon={<Toc className={classes.tabIcon} color="primary" />}
              />
            </Tabs>
            {tab === 'product' && this.renderProductTab(productId, product)}
            {tab === 'review' && this.renderReviewTab(productId)}
          </Paper>
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  // https://github.com/topheman/npm-registry-browser/blob/master/src/components/Package/Package.js
  // https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
  titleContainer: {
    backgroundColor: theme.palette.primary.dark,
    height: 320,
    margin: -theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4
  },
  titleContent: {
    width: '100%',
    maxWidth: 1280,
    margin: 'auto',
    padding: theme.spacing.unit
  },
  contentsContainer: {
    display: 'grid',
    gridGap: '16px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1280,
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '90vw',
      gridTemplateAreas: `"pt"
      "co"`
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '3fr 1fr',
      gridTemplateAreas: `"co pt"
      "co pt"`
    }
  },
  productTastesInfo: {
    gridArea: 'pt',
    padding: theme.spacing.unit,
    minWidth: 220,
    height: 240
  },
  contents: {
    gridArea: 'co',
    padding: theme.spacing.unit
  },
  tabRoot: { minWidth: 110 },
  tabWrapper: {
    flexDirection: 'row',
    minHeight: 42
  },
  tabLabel: { fontSize: theme.typography.pxToRem(14) },
  tabLabelIcon: { minHeight: 0 },
  tabIcon: { fontSize: 16 }
});

export default withStyles(styles)(ProductPage);
