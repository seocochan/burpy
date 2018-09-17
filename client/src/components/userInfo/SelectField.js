import React, { Fragment } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';

export default ({ input, label, meta: { touched, error } }) => {
  console.log(error);
  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend" error={Boolean(touched && error)}>
          {label}
        </FormLabel>
        <RadioGroup aria-label="Gender" name="gender" {...input}>
          <FormControlLabel
            value="남자"
            control={<Radio color="primary" />}
            label="남자"
          />
          <FormControlLabel
            value="여자"
            control={<Radio color="primary" />}
            label="여자"
          />
          <FormControlLabel
            value="고르고 싶지 않다"
            control={<Radio color="primary" />}
            label="고르고 싶지 않다"
          />
        </RadioGroup>
      </FormControl>
      {touched &&
        Boolean(error) && (
          <FormHelperText
            error={touched && Boolean(error)}
          >
            {error}
          </FormHelperText>
        )}
    </Fragment>
  );
};
