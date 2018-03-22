import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBarOld extends Component {
  render() {
    return (
      <div class="center row">
        <div class="col s12 ">
          <div class="row" id="search-bar">
            <div class="input-field col s6 s12">
              <i class="material-icons prefix">search</i>
              <input
                type="text"
                placeholder="검색"
                id="autocomplete-input"
                class="autocomplete"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SearchBarOld);
