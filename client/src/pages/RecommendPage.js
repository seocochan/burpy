import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
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

  renderList() {
    const { classes } = this.props;
    const { recommended } = this.state;

    return _.map(category, c => {
      if (recommended.hasOwnProperty(c.eng) && recommended[c.eng]) {
        const items = recommended[c.eng].map(item => (
          <ProductCardVertical key={item.id} product={item} />
        ));

        // let itemList = [];
        // recommended[c.eng].forEach(item => {
        //   itemList.push(
        //     <li key={item.id}>
        //       <Link to={`/product/${item.id}`}>{item.name}</Link>
        //       {` / 예상 평점: ${item.score}`}
        //     </li>
        //   );
        // });
        //
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
            <div className={classes.listContainer}>
              아직 추천 상품이 없습니다. 더 많은 리뷰를 등록하세요.
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
        <Typography variant="headline" gutterBottom>
          추천 상품 목록
        </Typography>
        {recommended && this.renderList()}
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
  }
});

export default withStyles(styles)(RecommendPage);
