import axios from 'axios';
import React, { Component } from 'react';
import ProductCardVertical from '../components/ProductCardVertical';
import SkeletonCardVertical from '../components/SkeletonCardVertical';
import { Typography } from '@material-ui/core';
import { Timeline, Whatshot, Update } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import backgroundImage from '../assets/images/banner-image1.jpg';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mostRated: [],
      mostReviewd: [],
      mostRecent: []
    };

    this.size = 5;
  }

  componentDidMount() {
    ['mostRated', 'mostReviewd', 'mostRecent'].forEach(async standard => {
      const fetched = await axios.get(
        `/api/featured-product?standard=${standard}&size=${this.size}`
      );
      this.setState({ [standard]: fetched.data });
    });
  }

  renderSkeletonList() {
    const { classes } = this.props;

    let items = [];
    for (let i = 0; i < 5; i++) {
      items.push(<SkeletonCardVertical key={i} />);
    }

    return (
      <div className={classes.listContainer}>
        <div className={classes.list}>{items}</div>
      </div>
    );
  }

  renderList(items) {
    const { classes } = this.props;

    return (
      <div className={classes.listContainer}>
        <div className={classes.list}>
          {items.map(item => (
            <ProductCardVertical key={item._id} product={item} />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { mostRated, mostReviewd, mostRecent } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.bannerContainer}>
          <div className={classes.bannerContents}>
            <Typography
              variant="display2"
              style={{ color: '#fff' }}
              gutterBottom
            >
              아이고, 이게 누구신가!
            </Typography>
            <Typography
              variant="headline"
              style={{ color: 'rgba(255,255,255,0.9)' }}
              gutterBottom
            >
              아! 돌아오셨군요! 제가 한 잔 내오겠습니다!
            </Typography>
          </div>
        </div>
        <div className={classes.contentsContainer}>
          <div className={classes.featuredSection}>
            <div className={classes.titleContainer}>
              <Timeline className={classes.icon} color="primary" />
              <Typography variant="headline">실시간 Top5 음료</Typography>
            </div>
            <Typography variant="subheading" gutterBottom>
              사용자들에게 가장 높은 평가를 받은 제품들입니다.
            </Typography>
            {mostRated.length === 0
              ? this.renderSkeletonList()
              : this.renderList(mostRated)}
          </div>
          <div className={classes.featuredSection}>
            <div className={classes.titleContainer}>
              <Whatshot className={classes.icon} color="primary" />
              <Typography variant="headline">최고 인기</Typography>
            </div>

            <Typography variant="subheading" gutterBottom>
              최다 리뷰 획득!
            </Typography>
            {mostReviewd.length === 0
              ? this.renderSkeletonList()
              : this.renderList(mostReviewd)}
          </div>
          <div className={classes.featuredSection}>
            <div className={classes.titleContainer}>
              <Update className={classes.icon} color="primary" />
              <Typography variant="headline">방금 등록됐어요</Typography>
            </div>

            <Typography variant="subheading" gutterBottom>
              지금 확인해보세요
            </Typography>
            {mostRecent.length === 0
              ? this.renderSkeletonList()
              : this.renderList(mostRecent)}
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  bannerContainer: {
    backgroundImage: `url(${backgroundImage}),linear-gradient( rgba(0,0,0,0.9), rgba(0,0,0,0.9) )`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: -theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing.unit * 8,
      paddingBottom: theme.spacing.unit * 8
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing.unit * 12,
      paddingBottom: theme.spacing.unit * 12
    }
  },
  bannerContents: {
    width: '90%',
    maxWidth: 1280,
    margin: 'auto',
    textAlign: 'center',
    wordBreak: 'keep-all'
  },
  contentsContainer: {
    width: '100%',
    maxWidth: 1280,
    margin: 'auto'
  },
  featuredSection: {
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
  titleContainer: {
    display: 'flex'
  },
  listContainer: {
    overflowX: 'auto'
  },
  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 0
  },
  icon: {
    fontSize: 32,
    marginRight: '0.5rem'
  }
});

export default withStyles(styles)(DashboardPage);
