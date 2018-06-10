import React from 'react';
import SelectList from 'react-widgets/lib/SelectList';
import 'react-widgets/dist/css/react-widgets.css'

export default ({ input, data }) => {
  return (
    <div>
      <SelectList
      {...input}
      onBlur = {()=>input.onBlur()}
      data = {data}/>
    </div>
  );
};
