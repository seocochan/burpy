import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Typography, Button, IconButton, Chip } from '@material-ui/core';
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
            {shops.map(shop => (
              <Chip className={classes.chip} key={shop} label={shop} />
            ))}
            <Typography className={classes.typo} variant="body2">
              {avgScore}
            </Typography>
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
  wishButton: {
    position: 'absolute',
    top: 0,
    right: 16
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(ProductBasicInfo);
