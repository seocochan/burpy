import _ from 'lodash';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
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
    file: null,
    imagePreviewUrl: null,
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

  renderImageInput() {
    const { imagePreviewUrl } = this.state;

    return (
      <Fragment>
        <input
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />
        {imagePreviewUrl && <img src={imagePreviewUrl} width="300px" />}
      </Fragment>
    );
  }

  renderDetailsEditor() {
    return (
      <Field key="details" component={TextEditor} type="text" name="details" />
    );
  }

  onFileChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  async onSubmit(values) {
    const { file } = this.state;

    const { category, name } = values;
    const uploadConfig = await axios.get(
      `/api/upload?category=${category}&name=${name}`
    );

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });

    console.log(uploadConfig.data.key);

    const res = await axios.post('/api/product', {
      ...values,
      imageUrl: uploadConfig.data.key
    });

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
          {this.renderImageInput()}
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
