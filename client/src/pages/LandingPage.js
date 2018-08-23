import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import backgroundImage from '../assets/images/landing-background.jpg';
import cameraImage from '../assets/images/camera.png';
import shareImage from '../assets/images/share.png';
import ideaImage from '../assets/images/idea.png';

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
              <Typography variant="display1" gutterBottom>
                사진을 찍고 상품을 찾으세요
              </Typography>
              <Typography variant="headline">
                모바일 앱을 통해 음료의 사진을 찍으세요! 똑똑한 Burpy가
                찾아드립니다.
              </Typography>
            </div>
            <div className={classes.infoImageFrame}>
              <img
                className={classes.infoImage}
                src={cameraImage}
                height="100%"
              />
              <Typography variant="caption">
                Icons made by{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/authors/smartline"
                  title="Smartline"
                >
                  Smartline
                </a>{' '}
                from{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                >
                  www.flaticon.com
                </a>{' '}
                is licensed by{' '}
                <a
                  className={classes.licenseLink}
                  href="http://creativecommons.org/licenses/by/3.0/"
                  title="Creative Commons BY 3.0"
                  target="_blank"
                >
                  CC 3.0 BY
                </a>
              </Typography>
            </div>
          </div>
          <div className={classes.infoEven}>
            <div className={classes.infoTitle}>
              <Typography variant="display1" gutterBottom>
                정보를 공유하세요
              </Typography>
              <Typography variant="headline">
                찾는 상품이 없나요? 상품을 직접 등록해보세요. Burpy는 여러분들의
                참여로 만들어집니다.
              </Typography>
            </div>
            <div className={classes.infoImageFrame}>
              <img
                className={classes.infoImage}
                src={shareImage}
                height="100%"
              />
              <Typography variant="caption">
                Icons made by{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/authors/mynamepong"
                  title="mynamepong"
                >
                  mynamepong
                </a>{' '}
                from{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                >
                  www.flaticon.com
                </a>{' '}
                is licensed by{' '}
                <a
                  className={classes.licenseLink}
                  href="http://creativecommons.org/licenses/by/3.0/"
                  title="Creative Commons BY 3.0"
                  target="_blank"
                >
                  CC 3.0 BY
                </a>
              </Typography>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>
              <Typography variant="display1" gutterBottom>
                당신의 취향을 분석합니다
              </Typography>
              <Typography variant="headline">
                한잔 하신 후엔 리뷰를 등록해보세요. Burpy의 인공지능이 취향을
                분석하고 좋아하실 만한 상품을 추천해드립니다.
              </Typography>
            </div>
            <div className={classes.infoImageFrame}>
              <img
                className={classes.infoImage}
                src={ideaImage}
                height="100%"
              />
              <Typography variant="caption">
                Icons made by{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/authors/vectors-market"
                  title="Vectors Market"
                >
                  Vectors Market
                </a>{' '}
                from{' '}
                <a
                  className={classes.licenseLink}
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                >
                  www.flaticon.com
                </a>{' '}
                is licensed by{' '}
                <a
                  className={classes.licenseLink}
                  href="http://creativecommons.org/licenses/by/3.0/"
                  title="Creative Commons BY 3.0"
                  target="_blank"
                >
                  CC 3.0 BY
                </a>
              </Typography>
            </div>
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
    minHeight: 300,
    marginBottom: theme.spacing.unit * 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  infoEven: {
    display: 'flex',
    minHeight: 300,
    marginBottom: theme.spacing.unit * 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse'
    }
  },
  infoTitle: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      width: '66.6667%'
    }
  },
  infoImageFrame: {
    height: 224,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.up('md')]: {
      width: '25%'
    }
  },
  infoImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: 2
  },
  licenseLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
});

export default withStyles(styles)(LandingPage);
