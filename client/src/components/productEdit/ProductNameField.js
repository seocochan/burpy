import React from 'react';
import { TextField } from '@material-ui/core';

export default ({
  className,
  input,
  label,
  meta: { error, touched },
  ...custom
}) => {
  return (
    <TextField
      autoComplete="off"
      className={className}
      placeholder={label}
      error={touched && error}
      {...input}
      {...custom}
    />
  );
};
