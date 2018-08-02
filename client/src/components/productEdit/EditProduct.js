import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router';
import ProductNameField from './ProductNameField';
import ProductCategorySelect from './ProductCategorySelect';
import ProductShopCheckbox from './ProductShopCheckbox';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import shopList from '../../assets/datas/productShopList';

const processShopList = (allShops, list) => {
  const result = {};

  allShops.forEach(shop => {
    result[shop] = list.includes(shop);
  });

  return result;
};

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imageUrl: null,
      isDone: false
    };

    this.id = props.match.params.id;
  }

  async componentDidMount() {
    const res = await axios.get(`/api/product/${this.id}`);
    const { category, name, shops = [], details, imageUrl = null } = res.data;

    this.props.initialize({
      category,
      name,
      shops: processShopList(shopList, shops),
      details
    });
    this.setState({ imageUrl });
  }

  renderNameField() {
    return (
      <Fragment>
        <Field
          className={'name'}
          key="name"
          component={ProductNameField}
          type="text"
          label="상품명"
          name="name"
        />
      </Fragment>
    );
  }

  renderCategorySelect() {
    return (
      <Fragment>
        <Field
          className={'category'}
          key="category"
          component={ProductCategorySelect}
          type="text"
          label="종류"
          name="category"
        />
      </Fragment>
    );
  }

  renderShopCheckBox() {
    return (
      <Fragment>
        <Field
          className={'shops'}
          key="shops"
          component={ProductShopCheckbox}
          type="checkbox"
          label="판매처"
          name="shops"
        />
      </Fragment>
    );
  }

  renderDetailsEditor() {
    return (
      <Field key="details" component={TextEditor} type="text" name="details" />
    );
  }

  async onSubmit(values) {
    const { file, imageUrl } = this.state;
    const { name, category, shops, details } = values;

    // 이미지 등록 과정
    let uploadConfig;
    if (file) {
      uploadConfig = imageUrl
        ? await axios.get(`/api/upload?key=${imageUrl}`)
        : await axios.get(`/api/upload?category=${category}&name=${name}`);
      // 수정 중인 상품에 기존 이미지가 있는 경우와 없는 경우 확인.
      // 기존 이미지가 없으면 신규 상품 등록시와 동일하게 처리.

      await axios.put(uploadConfig.data.url, file, {
        headers: {
          'Content-Type': file.type
        }
      });
    }

    // shops 객체의 value가 true인 key만 원소로 가지는 배열 shopList 생성
    let shopList = [];
    for (const [shop, value] of Object.entries(shops)) {
      if (value) {
        shopList.push(shop);
      }
    }

    await axios.put(`/api/product/${this.id}`, {
      name,
      category,
      shops: shopList,
      details,
      imageUrl: uploadConfig ? uploadConfig.data.key : imageUrl
    });

    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        상품 수정
        <ImageUploader
          imageUrl={this.state.imageUrl}
          watchFile={file => this.setState({ file })}
        />
        <Divider />
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderNameField()}
          {this.renderCategorySelect()}
          {this.renderShopCheckBox()}
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
