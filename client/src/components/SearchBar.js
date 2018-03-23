import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class SearchBar extends Component {
  onSubmit(values) {
    this.props.history.push(`/search?q=${values.search}`);
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
