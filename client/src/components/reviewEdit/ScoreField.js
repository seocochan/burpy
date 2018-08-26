import React from 'react';
import Rating from 'react-rating';
import { Typography } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

// 참조
// https://github.com/dreyescat/react-rating
// https://redux-form.com/7.2.3/docs/api/field.md/#usage
// https://stackoverflow.com/questions/45157197/how-to-integrate-react-rating-w-redux-form

export default ({ classes, input, label }) => {
  return (
    <div>
      <Typography variant="body2">{label}</Typography>
      <div>
        <Rating
          {...input}
          fractions={1}
          initialRating={parseFloat(input.value)}
          fullSymbol={
            <Star className={classes.starIcon} nativeColor="#ffda00" />
          }
          emptySymbol={
            <StarBorder className={classes.starIcon} nativeColor="#ffda00" />
          }
        />
      </div>
    </div>
  );
};
