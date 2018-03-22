import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';

class SearchBar extends Component {
  onSubmit(values) {
    console.log(values);
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
})(connect(null, actions)(SearchBar));
