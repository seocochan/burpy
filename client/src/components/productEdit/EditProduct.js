import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router';
import ProductField from './ProductField';
import productFormFields from './productFormFields';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isDone: false
    };

    this.id = props.match.params.id;
    this.imageUrl;
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.id}`);
    const { category, name, details, imageUrl = null } = res.data;

    this.props.initialize({ category, name, details });
    this.imageUrl = imageUrl;
  }

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
    const { file } = this.state;
    const { category, name } = values;

    const uploadConfig = this.imageUrl
      ? await axios.get(`/api/upload?key=${this.imageUrl}`)
      : await axios.get(`/api/upload?category=${category}&name=${name}`);
    // 수정 중인 상품에 기존 이미지가 있는 경우와 없는 경우 확인.
    // 기존 이미지가 없으면 신규 상품 등록시와 동일하게 처리.

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });

    await axios.put(`/api/product/${this.id}`, {
      ...values,
      imageUrl: uploadConfig.data.key
    });

    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        상품 수정
        <ImageUploader imageUrl={this.imageUrl} watchFile={file => this.setState({ file })} />
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
})(withStyles(styles)(EditProduct));
