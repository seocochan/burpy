import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import ProductField from './ProductField';
import productFormFields from './productFormFields';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };

    this.id = props.match.params.id;
    console.log(this.id);
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.id}`);
    const { category, name, details } = res.data;
    this.props.initialize({ category, name, details });
  }

  renderFields() {
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

  async onSubmit(values) {
    const res = await axios.put(`/api/product/${this.id}`, values);
    this.id = res.data._id;

    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        상품 수정
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
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
  // TODO: 여기에 validation 구현

  return errors;
}

export default reduxForm({
  validate,
  form: 'productForm',
  destroyOnUnmount: true
})(withStyles(styles)(EditProduct));
