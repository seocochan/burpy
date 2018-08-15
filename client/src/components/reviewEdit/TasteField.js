import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const field = ({ theme, input, label }) => {
  const trackStyle = { backgroundColor: theme.palette.secondary.main };
  const dotStyle = { backgroundColor: theme.palette.secondary.main };
  const activeDotStyle = { borderColor: '#ffe296', backgroundColor: '#ffe296' };
  const handleStyle = {
    borderColor: '#ffe296',
    backgroundColor: '#ffe296'
  };
  const marks = {
    1: {
      style: { width: 30, left: 'none', right: 'calc(100% - 15px)' },
      label: '전혀'
    },
    2: '약간',
    3: '보통',
    4: '많이',
    5: { style: { width: 30, left: 'none', right: -15 }, label: '엄청' }
  };

  return (
    <div style={{ marginBottom: 32, maxWidth: 420 }}>
      <Typography variant="body2">{label}</Typography>
      <div style={{ margin: 8 }}>
        <Slider
          min={1}
          max={5}
          dots
          marks={marks}
          trackStyle={trackStyle}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          handleStyle={handleStyle}
          {...input}
        />
      </div>
    </div>
  );
};

export default withTheme()(field);
