import _ from 'lodash';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Downshift from 'downshift';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

class SearchBar extends Component {
  state = {
    inputValue: '',
    suggestions: []
  };

  // TextField(input)
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  // form
  onSubmit(e) {
    e.preventDefault();

    const { inputValue } = this.state;
    this.props.history.push(`/search?q=${inputValue || ''}`);
  }

  // DownShift: 입력, hover, 선택 등 상태 변경시 트리거
  onStateChange = _.debounce(async changes => {
    const { inputValue } = changes;

    // 글자 입력에 의해 인풋 값이 변경된 경우
    if (typeof inputValue !== 'undefined') {
      const suggestions = await axios.get(`/api/suggest?q=${inputValue}`);
      this.setState({ suggestions: suggestions.data });
    }
  }, 300);

  // DownShift: 선택 상태 변경시에만 트리거
  onChange = selection => {
    this.setState({ inputValue: selection });
  };

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        className={classes.textField}
        InputProps={{
          inputRef: ref,
          ...InputProps
        }}
        {...other}
      />
    );
  }

  renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion._id) > -1;

    // @TODO: 여기에 바로가기 링크 추가
    return (
      <MenuItem
        {...itemProps}
        key={suggestion._id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;

    return (
      <div className={classes.container}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <Downshift
            inputValue={inputValue}
            onStateChange={this.onStateChange}
            onChange={this.onChange}
            itemToString={item => (item ? item : '')}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              selectedItem,
              highlightedIndex
            }) => {
              const { suggestions } = this.state;
              const { classes } = this.props;

              return (
                <div className={classes.inputContainer}>
                  {this.renderInput({
                    fullWidth: true,
                    InputProps: getInputProps({
                      onChange: this.handleInputChange,
                      placeholder: '검색',
                      id: 'search-input'
                    }),
                    classes
                  })}
                  {isOpen ? (
                    <Paper className={classes.inputPaper} square>
                      {suggestions.map((suggestion, index) =>
                        this.renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem
                        })
                      )}
                    </Paper>
                  ) : null}
                </div>
              );
            }}
          </Downshift>
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    padding: theme.spacing.unit,
    backgroundColor: amber[300],
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 180
  },
  inputContainer: {
    flexGrow: 1,
    position: 'relative'
  },
  inputPaper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});

export default withStyles(styles)(withRouter(SearchBar));
