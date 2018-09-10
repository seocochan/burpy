import React from 'react';
import { TextField } from '@material-ui/core';

export default ({ input: { value, onChange } }) => {
  return (
    <TextField
      id="birthday"
      label="생일"
      type="date"
      InputLabelProps={{
        shrink: true
      }}
      value={value.slice(0, 10)}
      onChange={onChange}
    />
  );
};
