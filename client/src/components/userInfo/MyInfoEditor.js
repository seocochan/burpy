import React, { Component } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import momentLocaliser from 'react-widgets-moment';
import axios from 'axios';
import moment from 'moment';
import InfoField from './InfoField';
import SelectField from './SelectField';
import DateField from './DateField';
import { Button,Divider,Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../actions'

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
    const name = this.props.auth.name;
    const gender = this.props.auth.gender;
    const birthday = this.props.auth.birthday;
    this.userId = this.props.auth._id
    this.props.initialize({name,gender,birthday})
  }

  renderMyInfo() {
    const {classes} = this.props
    return (
      <div>
        <div>
        <Typography
          className={classes.gap}
          variant='subheading'
          component='h4'>
          이름을 입력해 주세요.
          </Typography>
          <Field
            classes={classes}
            key="name"
            component={InfoField}
            type="text"
            label="이름"
            name="name"
          />
        </div>
        <div className={classes.genderField}>
        <Typography
          className={classes.gap}
          variant='subheading'
          component='h4'>
          성별을 선택해 주세요.
          </Typography>
          <Field
            key="gender"
            component={SelectField}
            name="gender"
            data={['남자', '여자','고르고 싶지 않다']}
          />
        </div>
        <div className={classes.dateField}>
          <Typography
          className={classes.gap}
          variant='subheading'
          component='h4'>
          생일을 입력해 주세요.
          </Typography>
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
    this.props.fetchUser();
  }

  render() {
    const {classes} = this.props
    return (
      <div className = {classes.container}>
       < h3>내정보 수정</h3>
        <Divider/>
        <div className={classes.userInfo}>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderMyInfo()}
          <Button className={classes.button} variant="raised" color="primary" type="submit">
            완료
            <Send />
          </Button>
          {this.state.isDone && <Redirect to={'/my-info'} />}
        </form>

        </div>
      </div>
    );
  }
}

const styles = theme =>({
  container : {
    width : '100%',
    maxWidth : '1280px',
    margin : 'auto'
  },
  userInfo : {
    marginRight: theme.spacing.unit*4
  },
  nameField : {
    marginTop : theme.spacing.unit,
    width:'100%',
    maxWidth:640
  },
  genderField : {
    marginTop : theme.spacing.unit*2,
    width:'100%',
    maxWidth:640
  },
  dateField : {
    marginTop : theme.spacing.unit*2,
    width : '100%',
    maxWidth:640
  },
  button : {
    marginTop : theme.spacing.unit*2
  },
  gap : {
    marginBottom : theme.spacing.unit,
    marginTop : theme.spacing.unit*2
  }

})

function validate(values) {
  const errors = {};
  // TODO: 여기에 validation 구현

  return errors;
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({
  validate,
  form: 'infoform',
  destroyOnUnmount: true
})(withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(MyInfoEditor)
));
