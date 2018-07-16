import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import ProductField from './ProductField';
import productFormFields from './productFormFields';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
    };

    this.id = props.match.params.id;
    console.log(this.id)
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.id}`);
    const { category,name,details } = res.data;
    this.props.initialize({ category,name,details });
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
  /*
  renderFields(){
    return(
      <div>
        <div>
          <Field
          key = "category"
          component = {ProductField}
          type="text"
          label="종류"
          name = "category"/>
        </div>
        <div>
          <Field
          key="name"
          component={ProductField}
          type="text"
          label="이름"
          name="name"/>
        </div>
        <div>
          <Field
          key="details"
          component={ProductField}
          type="text"
          label="설명"
          name="name"/>
        </div>
      </div>
    )
  }*/

  async onSubmit(values) {
    const res = await axios.put(`/api/product/${this.id}`, values);
    this.id = res.data._id;

    this.setState({ isDone: true });
  }

  render() {
    return (
      <div>
        상품 수정
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
})(EditProduct);
