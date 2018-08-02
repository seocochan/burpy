import React, { Fragment } from 'react';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import category from '../../assets/datas/productCategoryDict';

export default ({
  className,
  input,
  label,
  meta: { error, touched },
  ...custom
}) => {
  let menuItems = [];
  for (const c of Object.keys(category)) {
    menuItems.push(
      <MenuItem key={c} value={c}>
        {c}
      </MenuItem>
    );
  }

  return (
    <Fragment>
      <FormControl error={touched && error}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Select
          className={className}
          placeholder={label}
          {...input}
          {...custom}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Fragment>
  );
};
