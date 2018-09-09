import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Redirect } from 'react-router';
import category from '../../assets/datas/productCategoryDict';
import CommentField from './CommentField';
import ScoreField from './ScoreField';
import TasteField from './TasteField';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { Button, Typography, Divider } from '@material-ui/core';

class NewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isDone: false
    };

    this.productId = this.props.match.params.id;
    this.renderTastes = this.renderTastes.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/product/${this.productId}`).then(res => {
      this.setState({ product: res.data });
    });

    this.props.initialize({ taste: [3, 3, 3, 3, 3] });
  }

  renderScoreField() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          상품을 평가해주세요.
        </Typography>
        <Typography variant="body1" gutterBottom>
          1 ~ 5점 사이의 별점을 선택하실 수 있어요.
        </Typography>
        <div className={classes.fieldContainer}>
          <Field
            classes={classes}
            key="score"
            component={ScoreField}
            type="text"
            label="평점"
            name="score"
          />
        </div>
      </div>
    );
  }

  renderCommentField() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          이 상품을 어떻게 생각하시나요?
        </Typography>
        <Typography variant="body1" gutterBottom>
          상세한 평가를 입력해주시면 다른 사용자들이 상품을 선택하는 데 도움이
          됩니다.
        </Typography>
        <div className={classes.fieldContainer}>
          <Field
            classes={classes}
            key="comment"
            component={CommentField}
            type="text"
            label="코멘트"
            name="comment"
          />
        </div>
      </div>
    );
  }

  renderTasteFields() {
    const { classes } = this.props;

    return (
      <div className={classes.inputContainer}>
        <Typography variant="title" gutterBottom>
          맛은 어떤가요?
        </Typography>
        <Typography variant="body1" gutterBottom>
          1 ~ 5단계 사이로 맛의 강도를 선택해주세요.
        </Typography>
        <div className={classes.fieldContainer}>
          <FieldArray name="taste" component={this.renderTastes} />
        </div>
      </div>
    );
  }

  // example: https://codesandbox.io/s/Ww4QG1Wx
  // doc: https://github.com/erikras/redux-form/blob/master/docs/api/FieldArray.md
  // initialize: https://github.com/erikras/redux-form/issues/1761
  renderTastes({ fields }) {
    const { classes } = this.props;
    const tastes = category[this.state.product.category].params;

    return fields.map((item, i) => {
      return (
        <Field
          key={i}
          classes={classes}
          component={TasteField}
          name={item}
          label={tastes[i]}
        />
      );
    });
  }

  async onSubmit(values) {
    const { productId } = this;
    const { category } = this.state.product;
    const payload = { productId, category, ...values };

    await axios.post('/api/review', payload);
    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    if (!product) {
      return <div />;
    }

    return (
      <div className={classes.container}>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderScoreField()}
          {this.renderTasteFields()}
          <Divider />
          {this.renderCommentField()}
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
          {this.state.isDone && <Redirect to={`/product/${this.productId}`} />}
        </form>
      </div>
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
  inputContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  fieldContainer: {
    marginTop: theme.spacing.unit
  },
  starIcon: {
    fontSize: 48
  },
  error: {
    color: theme.palette.error.main
  },
  commentField: {
    width: '100%',
    maxWidth: 480
  },
  commentInput: {
    border: '1px solid #ecedef',
    backgroundColor: 'white'
  },
  submitIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 20
  },
  submitButton: {
    float: 'right'
  }
});

function validate(values) {
  const errors = {};

  ['score', 'taste', 'comment'].forEach(field => {
    if (!values[field]) {
      errors[field] = '필수항목입니다';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'reviewForm',
  destroyOnUnmount: true
})(withStyles(styles)(NewReview));
