import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Warning } from '@material-ui/icons';

const NotFoundPage = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Warning className={classes.icon} />
        <Typography className={classes.typo} variant="display2">
          404 ERROR
        </Typography>
      </div>
      <div className={classes.descriptionContainer}>
        <Typography className={classes.typo} variant="headline">
          여기가 아닌데...
        </Typography>
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 24,
    paddingBottom: theme.spacing.unit * 24
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 48,
    marginBottom: theme.spacing.unit * 2
  },
  descriptionContainer: {
    fontSize: 32
  },
  icon: {
    fontSize: 'inherit',
    marginRight: theme.spacing.unit
  },
  typo: {
    fontSize: 'inherit'
  }
});

export default withStyles(styles)(NotFoundPage);
