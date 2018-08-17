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
import {
  Button,
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress
} from '@material-ui/core';
import { Send, ExpandMore, Create } from '@material-ui/icons';
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
      isPending: true,
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
    this.setState({ isPending: false });
  }

  renderNameField() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          상품의 이름은 무엇인가요?
        </Typography>
        <Typography variant="body1" gutterBottom>
          상세한 상품명을 입력해주시면 다른 사용자들이 상품을 쉽게 찾을 수
          있습니다.
        </Typography>
        <Field
          classes={classes}
          key="name"
          component={ProductNameField}
          type="text"
          label="상품명"
          name="name"
        />
      </div>
    );
  }

  renderCategorySelect() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          어떤 종류인가요?
        </Typography>
        <Typography variant="body1" gutterBottom>
          아래 목록에서 해당되는 항목을 선택해주세요.
        </Typography>
        <Field
          classes={classes}
          key="category"
          component={ProductCategorySelect}
          type="text"
          label="종류"
          name="category"
        />
      </div>
    );
  }

  renderShopCheckBox() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          어디에서 구매할 수 있나요?
        </Typography>
        <Typography variant="body1" gutterBottom>
          이 상품을 구매할 수 있는 판매처를 알려주세요. (1개 이상 선택)
        </Typography>
        <Field
          classes={classes}
          key="shops"
          component={ProductShopCheckbox}
          type="checkbox"
          label="판매처"
          name="shops"
        />
      </div>
    );
  }

  renderImageUpoader() {
    const { classes } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          <Typography variant="caption" component="span">
            선택사항
          </Typography>
          상품의 대표 이미지를 등록해주세요.
        </Typography>
        <Typography variant="body1" gutterBottom>
          이 상품을 나타낼 수 있는 이미지를 한 장 등록할 수 있습니다.
        </Typography>
        <ImageUploader
          imageUrl={imageUrl}
          watchFile={file => this.setState({ file })}
        />
      </div>
    );
  }

  renderDetailsEditor() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          <Typography variant="caption" component="span">
            선택사항
          </Typography>
          상세 정보 작성
        </Typography>
        <Typography variant="body1" gutterBottom>
          이 상품에 대한 보다 상세한 정보를 자유롭게 작성할 수 있습니다.
        </Typography>
        <ExpansionPanel
          classes={{ root: classes.editorPanelRoot }}
          elevation={0}
        >
          <ExpansionPanelSummary
            classes={{ expandIcon: classes.editorSummaryIcon }}
            expandIcon={<ExpandMore />}
          >
            <Button variant="outlined">
              <Create className={classes.editorIcon} /> 에디터 표시
            </Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Field
              classes={classes}
              key="details"
              component={TextEditor}
              type="text"
              name="details"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
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
    const { classes, initialized } = this.props;
    const { isPending } = this.state;
    const loading = isPending || !initialized;

    return (
      <Fragment>
        {loading && (
          <div className={classes.progressContainer}>
            <CircularProgress />
          </div>
        )}

        <div
          className={classes.container}
          style={{ display: loading ? 'none' : 'block' }}
        >
          <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
            {this.renderNameField()}
            {this.renderCategorySelect()}
            <Divider />
            {this.renderShopCheckBox()}
            <Divider />
            {this.renderImageUpoader()}
            <Divider />
            {this.renderDetailsEditor()}
            <Button
              className={classes.submitButton}
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              <Send className={classes.submitIcon} />
              등록하기
            </Button>
            {this.state.isDone && <Redirect to={`/product/${this.id}`} />}
          </form>
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto',
    marginTop: theme.spacing.unit * 2
  },
  progressContainer: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    height: '100%',
    width: '100%',
    zIndex: 9999
  },
  inputContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  nameField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: '100%',
    maxWidth: 320
  },
  categoryField: {
    marginLeft: theme.spacing.unit,
    width: '100%',
    maxWidth: 320
  },
  shopsField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: '100%',
    maxWidth: 320
  },
  detailsField: {
    width: '98%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 2
  },
  submitButton: {
    float: 'right'
  },
  editorPanelRoot: {
    backgroundColor: 'transparent',
    '&:before': {
      backgroundColor: 'transparent'
    }
  },
  editorSummaryIcon: {
    left: -16
  },
  editorIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  submitIcon: {
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
