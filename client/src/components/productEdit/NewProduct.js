import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router';
import ProductField from './ProductField';
import productFormFields from './productFormFields';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

class NewProduct extends Component {
  state = { isDone: false };

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
    const res = await axios.post('/api/product', values);
    this.id = res.data._id;

    this.setState({ isDone: true });
  }

  render() {
    return (
      <div>
        상품 등록
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
          <Button variant="raised" color="primary" type="submit">
            완료
            <Icon>send</Icon>
          </Button>
          {this.state.isDone && <Redirect to={`/product/${this.id}`} />}
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
  form: 'productForm',
  destroyOnUnmount: true
})(NewProduct);
