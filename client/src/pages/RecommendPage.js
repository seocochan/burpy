import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import category from '../assets/datas/productCategoryDict';
import ProductCardVertical from '../components/ProductCardVertical';

class RecommendPage extends Component {
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

  renderTitle() {
    const { classes, auth } = this.props;

    if (auth == null) {
      return (
        <Typography className={classes.title} variant="display1" gutterBottom>
          <CircularProgress />
        </Typography>
      );
    }

    const { name, reviews } = auth;
    return (
      <Typography className={classes.title} variant="display1" gutterBottom>
        {`${name}님이 작성하신 ${reviews.length}개의 리뷰를 분석했습니다`}
      </Typography>
    );
  }

  renderList() {
    const { classes } = this.props;
    const { recommended } = this.state;

    return _.map(category, c => {
      if (recommended.hasOwnProperty(c.eng) && recommended[c.eng]) {
        const items = recommended[c.eng].map(item => (
          <ProductCardVertical key={item.id} product={item} />
        ));

        return (
          <div className={classes.productSection} key={c.eng}>
            <Typography variant="headline" gutterBottom>
              {c.kor}
            </Typography>
            <div className={classes.listContainer}>
              <div className={classes.list}>{items}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={classes.productSection} key={c.eng}>
            <Typography variant="headline" gutterBottom>
              {c.kor}
            </Typography>
            <div className={classes.emptyNotice}>
              리뷰를 더 등록하면 상품을 추천받을 수 있어요!
              <br />
              <Button
                component={Link}
                to={`/search?q=&category=${c.kor}&order=avgScore`}
              >
                더 많은 {`\'${c.kor}\'`} 평가하기
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { recommended } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>{this.renderTitle()}</div>
        {recommended == null ? (
          <div className={classes.progressContainer}>
            <CircularProgress />
          </div>
        ) : (
          this.renderList()
        )}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: 1280,
    margin: 'auto'
  },
  progressContainer: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    height: '100%',
    width: '100%',
    zIndex: 9999
  },
  titleContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    }
  },
  productSection: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      maxWidth: (120 + theme.spacing.unit / 2) * 5 + 20
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: (140 + theme.spacing.unit / 2) * 5 + 20
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: (180 + theme.spacing.unit) * 5 + 40
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: (200 + theme.spacing.unit) * 5 + 40
    }
  },
  listContainer: {
    overflowX: 'auto'
  },
  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 0
  },
  emptyNotice: {
    border: '1px solid #ecedef',
    backgroundColor: 'white',
    textAlign: 'center',
    lineHeight: '32px',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(connect(mapStateToProps)(RecommendPage));
