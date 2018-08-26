import React from 'react';
import ContentLoader from 'react-content-loader';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    backgroundColor: '#fff',
    border: '1px solid #ecedef',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      minWidth: 120,
      minHeight: 224.09,
      margin: theme.spacing.unit / 2
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 140,
      minHeight: 249.09,
      margin: theme.spacing.unit / 2
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 180,
      minHeight: 285.72,
      margin: theme.spacing.unit
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 200,
      minHeight: 308.33,
      margin: theme.spacing.unit
    }
  }
});

export default withStyles(styles)(props => {
  const { classes } = props;

  const card = (
    <div className={classes.container}>
      <ContentLoader
        height={308.33}
        width={200}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="200" height="223" />
        <rect x="8" y="231" rx="0" ry="0" width="60" height="18" />
        <rect x="8" y="259" rx="0" ry="0" width="120" height="18" />
        <rect x="8" y="289" rx="0" ry="0" width="80" height="18" />
      </ContentLoader>
    </div>
  );

  return card;
});
