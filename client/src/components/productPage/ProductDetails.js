import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { Typography, IconButton } from '@material-ui/core';
import TextViewer from './TextViewer';

class ProductDetails extends Component {
  renderDetails() {
    const { classes, productId, product } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="subheading">
            상세 정보
          </Typography>
          <IconButton
            classes={{ root: classes.iconButton }}
            aria-label="edit"
            component={Link}
            to={`/edit/product/${productId}`}
          >
            <Edit className={classes.icon} />
          </IconButton>
        </div>
        <TextViewer value={product.details} />
      </div>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return this.renderDetails();
  }
}

const styles = theme => ({
  container: {
    margin: theme.spacing.unit,
    minHeight: 56
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.unit * 2
  },
  title: {
    marginRight: 'auto'
  },
  iconButton: {
    width: 24,
    height: 24
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 24,
    marginRight: 0
  }
});

export default withStyles(styles)(ProductDetails);
