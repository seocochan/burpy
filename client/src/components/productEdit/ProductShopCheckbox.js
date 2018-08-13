import React, { Component, Fragment } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

/* FIXME: 
 * state가 이 컴포넌트와 redux-form에 이중으로 있음.
 * redux-form의 state만 사용하니 onChange 이후 즉각 렌더링이 되지 않아 이렇게 함.
 * componentWiilReceiveProps()를 이용하여 렌더링 최적화를 할 필요가 있음.
 */

class ProductShopCheckbox extends Component {
  state = { shops: this.props.input.value };

  onCheckChange = (e, checked) => {
    const { onChange } = this.props.input;
    let { value } = this.props.input;
    value = value === '' ? {} : value; // 신규 상품인 경우 ''가 초기값으로 지정되므로 객체로 변환

    value[e.target.value] = checked;

    this.setState({ shops: { ...value } });
    onChange({ ...value });
  };

  render() {
    const {
      classes,
      input: { value },
      label,
      meta: { error, touched },
      ...custom
    } = this.props;

    let menuItems = [];
    ['슈퍼 마켓', '편의점', '대형 마트', '주류 전문점'].forEach(shop => {
      menuItems.push(
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value[shop])}
              onChange={this.onCheckChange}
              value={shop}
              color="primary"
            />
          }
          key={shop}
          label={shop}
        />
      );
    });

    return (
      <Fragment>
        <FormControl
          className={classes.shopsField}
          component="fieldset"
          error={touched && error}
        >
          <FormLabel component="legend">판매처</FormLabel>
          <FormGroup>{menuItems}</FormGroup>
        </FormControl>
      </Fragment>
    );
  }
}

export default ProductShopCheckbox;
