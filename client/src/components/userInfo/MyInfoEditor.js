import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router';
import axios from 'axios';
import InfoField from './InfoField';
import SelectField from './SelectField';
import DateField from './DateField';
import { Button, Divider, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MyInfoEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false
    };

    this.userId = '';
    this.isInit = false;
  }

  initForm(auth) {
    this.isInit = true;

    const { name, gender, birthday } = auth;
    this.userId = auth._id;
    this.props.initialize({ name, gender, birthday });
  }

  componentDidMount() {
    const { auth } = this.props;

    if (auth) {
      this.initForm(auth);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (!this.isInit && auth != null) {
      this.initForm(auth);
    }
  }

  renderMyInfo() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <Typography
            className={classes.gap}
            variant="subheading"
            component="h4"
          >
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
            variant="subheading"
            component="h4"
          >
            성별을 선택해 주세요.
          </Typography>
          <Field
            key="gender"
            component={SelectField}
            label="성별"
            name="gender"
          />
        </div>
        <div className={classes.dateField}>
          <Typography
            className={classes.gap}
            variant="subheading"
            component="h4"
          >
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
    if (this.props.auth == null) return <div />;

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h3>내정보 수정</h3>
        <Divider />
        <div className={classes.userInfo}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
            {this.renderMyInfo()}
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              type="submit"
            >
              <Send className={classes.sendIcon}/>
              완료
            </Button>
            {this.state.isDone && <Redirect to={'/my-info'} />}
          </form>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto',
    marginTop : theme.spacing.unit *2
  },
  userInfo: {
    marginRight: theme.spacing.unit * 4
  },
  nameField: {
    marginTop: theme.spacing.unit,
    width: '100%',
    maxWidth: 320
  },
  genderField: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  },
  dateField: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    float : 'right'
  },
  gap: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  sendIcon : {
    marginRight : theme.spacing.unit,
    fontSize: 20
  }
});

function validate(values) {
  const errors = {};

  ['name', 'gender', 'birthday'].forEach(field => {
    if (!values[field]) {
      errors[field] = '필수항목입니다.';
    }
  })

  return errors;
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({
  validate,
  form: 'infoform',
  destroyOnUnmount: true
})(
  withStyles(styles)(
    connect(
      mapStateToProps,
      actions
    )(MyInfoEditor)
  )
);
