import React, { Component } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import momentLocaliser from 'react-widgets-moment';
import configure from 'react-widgets/lib/configure';
import 'react-widgets/dist/css/react-widgets.css';
import axios from 'axios';
import moment from 'moment';
import InfoField from './InfoField';
import SelectField from './SelectField';
import DateField from './DateField';
import DropdownList from './DropdownField';
import { Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

moment.locale('ko');
momentLocaliser();
class MyInfoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };
    this.userId = '';
  }

  componentDidMount() {
    axios.get('/api/myinfo').then(res => {
      const { name, gender, birthday } = res.data;
      this.userId = res.data._id;
      this.props.initialize({ name, gender });
    });
  }

  renderMyInfo() {
    return (
      <div>
        <div>
          <Field
            key="name"
            component={InfoField}
            type="text"
            label="이름"
            name="name"
          />
        </div>
        <div>
          <label>성별</label>
          <Field
            key="gender"
            component={SelectField}
            name="gender"
            data={['male', 'female']}
          />
        </div>
        <div>
          <label>생일</label>
          <Field
            key="birthday"
            component={DateField}
            showTime={false}
            name="birthday"
          />
        </div>
      </div>
    );
  }

  async onSubmit(values) {
    const res = await axios.put(`/api/myinfo/${this.userId}`, values);
    this.setState({ isDone: true });
  }

  render() {
    return (
      <div>
        내정보 수정
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderMyInfo()}
          <Button variant="raised" color="primary" type="submit">
            완료
            <Send />
          </Button>
          {this.state.isDone && <Redirect to={'/my-info'} />}
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // TODO: 여기에 validation 구현

  return errors;
}

export default reduxForm({
  validate,
  form: 'infoform',
  destroyOnUnmount: true
})(MyInfoEditor);
