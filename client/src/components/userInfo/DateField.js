import React from 'react';
import DatePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';

export default ({ input: { onChange, value }, showTime }) => {
  return (
    <div>
      <DatePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
      />
    </div>
  );
};
