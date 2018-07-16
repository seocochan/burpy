import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Input, TextField } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

class SearchBar extends Component {
  onSubmit(values) {
    this.props.history.push(`/search?q=${values.search || ''}`);
  }

  // 리덕스폼-MUI 연동
  // https://redux-form.com/7.1.2/examples/material-ui/
  renderTextField = ({ className, input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      className={className}
      {...input}
      {...custom}
    />
  );

  render() {
    const { classes } = this.props;
    const { handleSubmit } = this.props;

    return (
      <div className={classes.container}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            className={classes.textField}
            name="search"
            type="text"
            placeholder="꺼-억"
            component={this.renderTextField}
          />
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    backgroundColor: amber[300],
    //background: 'rgba(1, 1, 1, 0.1)',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 180
  }
});

export default reduxForm({
  form: 'SearchForm'
})(
  withStyles(styles)(
    withRouter(
      connect(
        null,
        actions
      )(SearchBar)
    )
  )
);
