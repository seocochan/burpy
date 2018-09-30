import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Button, Icon } from '@material-ui/core';
import { Edit, Today, Face, Wc, PhotoCamera, Comment,LocalParking,Star,Warning } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import category from '../assets/datas/productCategoryDict';
import {
  PhotoIcon,
  BeerIcon,
  SodaIcon,
  CoffeeIcon,
  WhiskeyIcon
} from '../assets/icons';

class MyInfoPage extends Component {
  async handleCloseAccountClick() {
    const res = await axios.delete('/api/auth');
    console.log(res);

    if (res.status === 200) {
      window.location.replace('/');
    }
  }

  renderEditButton() {
    return (
      <IconButton
        aria-label="Edit"
        component={Link}
        to={`/edit/my-info/${this.props.auth._id}`}
      >
        <Edit />
      </IconButton>
    );
  }

  renderPoint() {
    const { points = 0 } = this.props.auth;

    return <Typography>{points}점</Typography>;
  }

  renderReviewCount() {
    const { reviewedProducts = {} } = this.props.auth;

    return _.map(category, c => {
      return (
        <Typography key={c.eng}>
          {c.kor}: {reviewedProducts[c.kor].length}개
        </Typography>
      );
    });
  }


  renderBadges() {
    const {
      classes,
      auth: { badges = [] }
    } = this.props;

    return badges.map(name => (
      <div key={name}>
        {badgeDict[name].icon}
        <Typography className={classes.badgeText} variant="caption" align='center'>
          {badgeDict[name].label}
        </Typography>
      </div>
    ));
  }

  Badge(){
    const { classes } = this.props

    return(
      <div className={classes.badgeContainer}>
        {this.renderBadges()}
      </div>
    )
  }

  renderImageUploadCount() {
    const { imageUploadCount = 0 } = this.props.auth;

    return <Typography>{imageUploadCount}개</Typography>;
  }

  render() {
    const { classes, auth } = this.props;

    if (auth == null) return <div />;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            <Typography variant="headline" component="h2">
              내 정보
            </Typography>
          </div>
          <p>{this.renderEditButton()}</p>
        </div>
        <Divider />
        <Paper className={classes.paperSize}>
          <List>
            <ListItem>
              <Avatar>
                <Face />
              </Avatar>
              <ListItemText primary="이름" secondary={auth.name} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <Wc />
              </Avatar>
              <ListItemText primary="성별" secondary={auth.gender} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <Today />
              </Avatar>
              <ListItemText primary="생일" secondary={auth.birthday} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <LocalParking />
              </Avatar>
              <ListItemText primary="포인트" secondary={this.renderPoint()} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <PhotoCamera />
              </Avatar>
              <ListItemText primary="업로드한 이미지" secondary={this.renderImageUploadCount()} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <Star />
              </Avatar>
              <ListItemText primary="나의 뱃지" secondary={this.Badge()} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <Comment />
              </Avatar>
              <ListItemText primary="작성한 리뷰" secondary={this.renderReviewCount()} />
            </ListItem>
          </List>
        </Paper>
        <Button 
        onClick={() => this.handleCloseAccountClick()}
        className={classes.cancelButton}>
        <Warning  className={classes.cancelIcon}/>
          회원 탈퇴
        </Button>
      </div>
    );
  }
}

const badgeDict = {
  image: { label: '버프그래퍼', icon: <PhotoIcon /> },
  맥주: { label: '버피', icon: <BeerIcon /> },
  '탄산 음료': { label: '버프라이트', icon: <SodaIcon /> },
  커피: { label: '버피스타', icon: <CoffeeIcon /> },
  위스키: { label: '버스키', icon: <WhiskeyIcon /> }
};

const styles = theme => ({
  container: {
    justifyContent: 'center',
    width: '100%',
    margin: 'auto',
    maxWidth: '1280px'
  },
  paperSize: {
    padding: theme.spacing.unit,
    marginTop: '20px'
  },
  userInfo: {
    fontSize: 20,
    padding: 'center'
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: 'auto'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  badgeItem: {
    maxWidth: '20%',
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  badgeText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cancelButton : {
    float : 'right'
  },
  cancelIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(connect(mapStateToProps)(MyInfoPage));
