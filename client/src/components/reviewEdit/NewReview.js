import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { reduxForm, Field, FieldArray, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import category from '../../productCategoryDict';
import CommentField from './CommentField';
import ScoreField from './ScoreField';
import TasteField from './TasteField';
import { withStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import { Button } from '@material-ui/core';

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

  renderFields() {
    return (
      <Fragment>
        <Field
          key="comment"
          component={CommentField}
          type="text"
          label="내용"
          name="comment"
        />
        <Field
          key="score"
          component={ScoreField}
          type="text"
          label="평점"
          name="score"
        />
        <FieldArray name="taste" component={this.renderTastes} />
      </Fragment>
    );
  }

  // example: https://codesandbox.io/s/Ww4QG1Wx
  // doc: https://github.com/erikras/redux-form/blob/master/docs/api/FieldArray.md
  // initialize: https://github.com/erikras/redux-form/issues/1761
  renderTastes({ fields }) {
    const tastes = category[this.state.product.category].params;

    return (
      <ul>
        {fields.map((item, i) => {
          return (
            <li key={i}>
              <Field
                component={TasteField}
                type="text"
                name={item}
                label={tastes[i]}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  async onSubmit(values) {
    const { productId } = this;
    const payload = { productId, ...values };
    await axios.post('/api/review', payload);

    this.setState({ isDone: true });
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    return (
      <Fragment>
        리뷰등록
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {product && this.renderFields()}
          <Button variant="raised" color="primary" type="submit">
            <Send className={classes.icon} />
            완료
          </Button>
          {this.state.isDone && <Redirect to={`/product/${this.productId}`} />}
        </form>
      </Fragment>
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
  form: 'reviewForm',
  destroyOnUnmount: true
})(withStyles(styles)(NewReview));
