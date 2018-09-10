import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="Gender" name="gender" {...input}>
        <FormControlLabel value="남자" control={<Radio />} label="남자" />
        <FormControlLabel value="여자" control={<Radio />} label="여자" />
        <FormControlLabel
          value="고르고 싶지 않다"
          control={<Radio />}
          label="고르고 싶지 않다"
        />
      </RadioGroup>
    </FormControl>
  );
};
