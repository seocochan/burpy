import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

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

    return (
      <div>
        <li>이름 : {info.name}</li>
        <br />
        <li>
          성별 : {info.gender == null ? '추가로 입력하세요.' : info.gender}
        </li>
        <br />
        <li>
          생일 : {info.birthday == null ? '추가로 입력하세요.' : info.birthday}
        </li>
        <br />
        <p>{this.renderEditButton()}</p>
      </div>
    );
  }
}

export default MyInfo;
