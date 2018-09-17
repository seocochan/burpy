import React, { Fragment } from 'react';
import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem
} from '@material-ui/core';
import category from '../../assets/datas/productCategoryDict';

export default ({ classes, input, label, meta: { error, touched } }) => {
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
      <FormControl
        className={classes.categoryField}
        error={touched && Boolean(error)}
      >
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Select placeholder={label} {...input}>
          {menuItems}
        </Select>
      </FormControl>
      {touched &&
        Boolean(error) && (
          <FormHelperText
            error={touched && Boolean(error)}
            style={{ marginLeft: 8 }}
          >
            {error}
          </FormHelperText>
        )}
    </Fragment>
  );
};
