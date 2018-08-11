import React from 'react';
import { TextField } from '@material-ui/core';

export default ({
  classes,
  input,
  label,
  meta: { error, touched }
}) => {
  return (
    <TextField
      autoComplete="off"
      className={classes.nameField}
      placeholder={label}
      error={touched && Boolean(error)}
      {...input}
    />
  );
};
