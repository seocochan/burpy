import axios from 'axios';
import React, { Component } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { Redirect } from 'react-router';
import CommentField from './CommentField';
import ScoreField from './ScoreField';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

class EditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };

    this.reviewId = this.props.match.params.id;
  }

  async componentDidMount() {
    const res = await axios.get(`/api/review/${this.reviewId}`);
    const { comment, score } = res.data;
    this.props.initialize({ comment, score });
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
      </div>
    );
  }

  async onSubmit(values) {
    const res = await axios.put(`/api/review/${this.reviewId}`, values);
    this.setState({ isDone: true });
  }

  render() {
    return (
      <div>
        리뷰수정
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
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
