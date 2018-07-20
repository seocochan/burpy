import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router';
import ProductField from './ProductField';
import productFormFields from './productFormFields';
import TextEditor from './TextEditor';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class NewProduct extends Component {
  state = {
    isDone: false
  };

  renderBasicFields() {
    return _.map(productFormFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={ProductField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderDetailsEditor() {
    return (
      <Field key="details" component={TextEditor} type="text" name="details" />
    );
  }

  async onSubmit(values) {
    const res = await axios.post('/api/product', values);
    this.id = res.data._id;
    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        상품 등록
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderBasicFields()}
          {this.renderDetailsEditor()}
          <Button variant="raised" color="primary" type="submit">
            <Send className={classes.icon} />
            완료
          </Button>
          {this.state.isDone && <Redirect to={`/product/${this.id}`} />}
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  }
});

function validate(values) {
  const errors = {};

  ['name', 'category', 'details'].forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'productForm',
  destroyOnUnmount: true
})(withStyles(styles)(NewProduct));
