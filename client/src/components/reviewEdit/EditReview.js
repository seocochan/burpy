import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import CommentField from './CommentField';
import ScoreField from './ScoreField';
import TasteField from './TasteField';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import category from '../../productCategoryDict';

class EditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isDone: false
    };

    this.reviewId = this.props.match.params.id;
    this.productId = '';
    this.renderTastes = this.renderTastes.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(`/api/review/${this.reviewId}`);
    const { comment, score, taste } = res.data;
    this.productId = res.data.productId;
    this.props.initialize({ comment, score, taste });

    axios.get(`/api/product/${this.productId}`).then(res => {
      this.setState({ product: res.data });
    });
  }

  renderFields() {
    return (
      <div>
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
      </div>
    );
  }

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
    const res = await axios.put(`/api/review/${this.reviewId}`, values);
    this.setState({ isDone: true });
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        리뷰수정
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {product && this.renderFields()}
          <Button variant="raised" color="primary" type="submit">
            완료
            <Icon>send</Icon>
          </Button>
          {this.state.isDone && <Redirect to={`/product/${this.productId}`} />}
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
  form: 'reviewForm',
  destroyOnUnmount: true
})(EditReview);
