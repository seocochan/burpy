import React, { Component, Fragment } from 'react';
import Rating from 'react-rating';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, IconButton, Chip } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import WishButton from './WishButton';
import noImage from '../../assets/images/noImage.png';

class ProductBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';
  }

  renderBasicInfos() {
    const {
      classes,
      productId,
      product: { name, category, shops = [], avgScore, imageUrl }
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.thumbnailFrame}>
          <img
            className={classes.thumbnail}
            src={imageUrl ? this.s3Url + imageUrl : noImage}
            height="240px"
          />
        </div>
        <div className={classes.informations}>
          <div className={classes.topItem}>
            <Typography className={classes.typoSub} variant="subheading">
              {category}
            </Typography>
            <Typography className={classes.typo} variant="title">
              {name}
            </Typography>
          </div>
          <div className={classes.bottomItem}>
            <div className={classes.shopList}>
              {shops.map(shop => (
                <Chip className={classes.chip} key={shop} label={shop} />
              ))}
            </div>
            <Typography className={classes.typoScore} variant="body2">
              평균 {avgScore.toFixed(1)}
            </Typography>
            <Rating
              readonly
              initialRating={parseFloat(avgScore)}
              fullSymbol={
                <Star className={classes.starIcon} nativeColor="#ffda00" />
              }
              emptySymbol={
                <StarBorder
                  className={classes.starIcon}
                  nativeColor="#ffda00"
                />
              }
            />
            <div className={classes.wishButton}>
              <WishButton productId={productId} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return <Fragment>{this.renderBasicInfos()}</Fragment>;
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    marginTop: theme.spacing.unit * 4,
    height: '100%'
  },
  thumbnailFrame: {
    width: '25%',
    height: '80%',
    maxWidth: 180,
    maxHeight: 240,
    minWidth: 120,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 2
  },
  thumbnail: {
    width: '100%',
    heigth: '100%',
    objectFit: 'contain',
    backgroundColor: '#fff'
  },
  informations: {
    flex: '1 1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1.5rem'
  },
  topItem: {
    flexGrow: 1
  },
  bottomItem: {
    marginTop: 'auto'
  },
  typo: {
    color: '#fff'
  },
  typoSub: {
    color: '#d3d5ea'
  },
  typoScore: {
    color: '#fff',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  wishButton: {
    position: 'absolute',
    top: -16,
    right: 12
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  shopList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    maxWidth: 70,
    height: 20,
    fontSize: 12,
    backgroundColor: theme.palette.secondary.main
  },
  starIcon: {
    fontSize: 32
  }
});

export default withStyles(styles)(ProductBasicInfo);
