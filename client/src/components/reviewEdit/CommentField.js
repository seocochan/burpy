import React from 'react';
import { TextField } from '@material-ui/core';

export default ({ classes, input, label, meta: { error, touched } }) => {
  return (
    <div>
      <TextField
        className={classes.commentField}
        autoComplete="off"
        label={label}
        multiline
        rows="4"
        error={touched && Boolean(error)}
        helperText={touched && error}
        InputProps={{
          disableUnderline: true,
          classes: {
            inputMultiline: classes.commentInput
          }
        }}
        InputLabelProps={{ shrink: true }}
        {...input}
      />
    </div>
  );
};
