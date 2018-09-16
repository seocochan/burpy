import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TodayIcon from '@material-ui/icons/Today';
import FaceIcon from '@material-ui/icons/Face';
import GenderIcon from '@material-ui/icons/SupervisorAccount';
import { connect } from 'react-redux';

class MyInfo extends Component {
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

  render() {
    const { classes, auth } = this.props;

    if (auth == null) return <div />;

    return (
      <div className={classes.container}>
      <div className={classes.titleContainer}>
      <div className = {classes.title}>
        <Typography variant="headline" component="h2">
          내 정보 조회
        </Typography>
        </div>
        <p>{this.renderEditButton()}</p>
        </div>
        <Divider/>
        <Paper className={classes.paperSize}>
          <List>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="이름" secondary={auth.name} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <GenderIcon />
              </Avatar>
              <ListItemText primary="성별" secondary={auth.gender} />
            </ListItem>
            <Divider inset component="li" />
            <ListItem>
              <Avatar>
                <TodayIcon />
              </Avatar>
              <ListItemText primary="생일" secondary={auth.birthday} />
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

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
  title : {
    marginLeft: theme.spacing.unit,
    marginRight: 'auto'
  },
  titleContainer : {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(connect(mapStateToProps)(MyInfo));
