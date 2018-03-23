import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

// TODO: 
// 폼의 입력상태를 항상 store의 search화 동기화 하기

class SearchBar extends Component {
  onSubmit(values) {
    this.props.history.push(`/search?q=${values.search}`);
    this.props.updateSearch(values.search);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="search"
            type="text"
            placeholder="검색"
            component="input"
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchForm'
})(withRouter(connect(null, actions)(SearchBar)));
