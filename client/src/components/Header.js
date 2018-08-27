import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ThumbUp, LocalBar, AccountCircle } from '@material-ui/icons';
import LogoIcon from './LogoIcon';

class Header extends Component {
  state = {
    drawer: false,
    anchorEl: null,
    value: 0
  };

  toggleDrawer = open => () => {
    this.setState({
      drawer: open
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, auth } = this.props;
    const { drawer, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {auth && (
          <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              <List>
                <div className={classes.drawerList}>
                  <ListItem button component={Link} to="/recommend">
                    <ListItemIcon>
                      <ThumbUp className={classes.icon} />
                    </ListItemIcon>
                    추천음료
                  </ListItem>
                  <ListItem button component={Link} to="/my-products">
                    <ListItemIcon>
                      <LocalBar className={classes.icon} />
                    </ListItemIcon>
                    마이바
                  </ListItem>
                  <Divider />
                  <ListItem button component={Link} to="/my-info">
                    내 정보
                  </ListItem>
                  <ListItem button component={Link} to="/wishlist">
                    찜 목록
                  </ListItem>
                  <ListItem button component="a" href="/api/logout">
                    로그아웃
                  </ListItem>
                </div>
              </List>
            </div>
          </Drawer>
        )}
        <AppBar position="fixed">
          <Toolbar classes={{ root: classes.toolbar }} disableGutters>
            {auth && (
              <Hidden smUp implementation="css">
                <IconButton
                  style={{ margin: 0 }}
                  className={classes.drawerButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            )}
            <Typography
              className={classes.logo}
              variant="title"
              color="inherit"
              component={Link}
              to="/"
            >
              <LogoIcon width={110} height={28} color={'#f0ecdf'} />
            </Typography>
            {auth ? (
              <Fragment>
                <Hidden xsDown implementation="css">
                  <Button color="secondary" component={Link} to="/recommend">
                    <ThumbUp className={classes.icon} />
                    추천음료
                  </Button>
                  <Button color="secondary" component={Link} to="/my-products">
                    <LocalBar className={classes.icon} />
                    마이바
                  </Button>
                </Hidden>
                <SearchBar />
                <Hidden xsDown implementation="css">
                  <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem
                        onClick={this.handleClose}
                        component={Link}
                        to="/my-info"
                      >
                        내 정보
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        component={Link}
                        to="/wishlist"
                      >
                        찜 목록
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        component="a"
                        href="/api/logout"
                      >
                        로그아웃
                      </MenuItem>
                    </Menu>
                  </div>
                </Hidden>
              </Fragment>
            ) : (
              auth != null && (
                <Fragment>
                  <Button color="secondary" component="a" href="#details">
                    Burpy는?
                  </Button>
                  <Button color="secondary" component="a" href="#top">
                    가입하기
                  </Button>
                </Fragment>
              )
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    width: '100%',
    maxWidth: 1280,
    margin: 'auto'
  },
  logo: {
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 16
    }
  },
  drawerButton: {
    marginLeft: '-1rem',
    marginRight: '1rem'
  },
  drawerList: {
    width: 250
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(connect(mapStateToProps)(Header));
