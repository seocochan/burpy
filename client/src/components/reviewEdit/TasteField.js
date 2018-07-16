import React from 'react';
import Rating from 'react-rating'; 

export default ({input, label}) => {
  
  return (
    <div>
      <label>{label}</label>
      <Rating
        {...input}
        fractions={1}
        initialRating={parseFloat(input.value)}
      />
    </div>
  );
};
