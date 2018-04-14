import React from 'react';
import Rating from 'react-rating';

// 참조
// https://github.com/dreyescat/react-rating 
// https://redux-form.com/7.2.3/docs/api/field.md/#usage 
// https://stackoverflow.com/questions/45157197/how-to-integrate-react-rating-w-redux-form 

export default ({input, label}) => {
  
  return (
    <div>
      <label>{label}</label>
      <Rating
        {...input}
        fractions={2}
        initialRating={parseFloat(input.value)}
      />
    </div>
  );
};
