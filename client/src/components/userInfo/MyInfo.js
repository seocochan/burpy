import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {Paper,Table} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }

  componentDidMount() {
    axios.get('/api/myinfo').then(res => {
      this.setState({ info: res.data });
    });
  }



  renderEditButton() {
    return (
      <IconButton
        aria-label="Edit"
        component={Link}
        to={`/edit/my-info/${this.state.info._id}`}
      >
        <Edit />
      </IconButton>
    );
  }
  render() {
    const { info } = this.state;
    const {classes} = this.props;

    return (
      <div className = {classes.container}>
        <Paper className = {classes.paperSize}>
          <Table className = {classes.userInfo}>
            <TableBody>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>{info.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>성별</TableCell>
                <TableCell>{info.gender==null ? '추가로 입력하세요' : info.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>생일</TableCell>
                <TableCell>{info.birthday==null ? '추가로 입력하세요' : info.birthday}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <p>{this.renderEditButton()}</p>
      </div>
    );
  }
}

const styles = theme =>({
  container : {
    justifyContent : 'center',
    width : '100%',
    margin : 'auto',
    maxWidth : '960px'
  },
  paperSize : {
    padding : theme.spacing.unit
  },
  userInfo : {
    fontSize : 20,
    padding : 'center'
  }

})

export default withStyles(styles)(MyInfo);
