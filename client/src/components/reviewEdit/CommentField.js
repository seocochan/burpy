import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <TextField {...input} multiline rows="4" style={{ width: 400 }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
