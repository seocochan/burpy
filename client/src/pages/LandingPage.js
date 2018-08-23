import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import backgroundImage from '../assets/images/landing-background.jpg';

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} id="top">
        <div className={classes.introductionContainer}>
          <div className={classes.introductionContents}>
            <div className={classes.phrase}>
              <Typography
                variant="display2"
                style={{ color: '#fff' }}
                gutterBottom
              >
                찍고, 마시고, 기록하세요
              </Typography>
              <Typography
                variant="headline"
                style={{ color: 'rgba(255,255,255,0.9)' }}
                gutterBottom
              >
                Burpy에서 전세계 음료를 리뷰하세요. 여러분에게 꼭 맞는 음료를
                추천해드릴게요.
              </Typography>
            </div>
            <div className={classes.login}>
              <Button
                className={classes.button}
                variant="contained"
                component="a"
                href="/auth/login/naver"
              >
                네이버 아이디로 로그인
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                component="a"
                href="/auth/twitter"
              >
                트위터 아이디로 로그인
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                component="a"
                href="/auth/google"
              >
                구글 아이디로 로그인
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.details} id="details">
          <div className={classes.info}>
            <div className={classes.infoTitle}>
              <Typography variant="display1">기능 타이틀</Typography>
              <Typography variant="headline">기능 설명</Typography>
            </div>
            <div className={classes.infoImage}>기능 이미지</div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>
              <Typography variant="display1">기능 타이틀</Typography>
              <Typography variant="headline">기능 설명</Typography>
            </div>
            <div className={classes.infoImage}>기능 이미지</div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>
              <Typography variant="display1">기능 타이틀</Typography>
              <Typography variant="headline">기능 설명</Typography>
            </div>
            <div className={classes.infoImage}>기능 이미지</div>
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
  introductionContainer: {
    backgroundImage: `url(${backgroundImage}),linear-gradient( rgba(0,0,0,0.9), rgba(0,0,0,0.9) )`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: -theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing.unit * 18,
      paddingBottom: theme.spacing.unit * 18
    }
  },
  introductionContents: {
    width: '90%',
    maxWidth: 1280,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  phrase: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      width: '66.6667%'
    }
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      width: '86.6667%',
      height: 200,
      marginTop: theme.spacing.unit * 4
    },
    [theme.breakpoints.up('sm')]: {
      width: '52.6667%',
      height: 200,
      marginTop: theme.spacing.unit * 4
    },
    [theme.breakpoints.up('md')]: {
      width: '33.3334%',
      height: 224
    }
  },
  button: {
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      height: 48
    },
    [theme.breakpoints.up('md')]: {
      height: 56
    }
  },
  details: {
    width: '90%',
    maxWidth: 1280,
    margin: 'auto',
    height: 400
  },
  info: {
    display: 'flex',
    minHeight: 320,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  infoTitle: {},
  infoImage: {}
});

export default withStyles(styles)(LandingPage);
