import React, { Component } from 'react';

class SodaIcon extends Component {
  render() {
    const { width = 50, height = 50 } = this.props;

    return (
      <svg
        id="soda-icon"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 144 144"
      >
        <circle fill="#303F9F" cx="72" cy="72" r="72" />
        <polygon
          fill="#D32F2F"
          points="89.396,25.71 54.604,25.71 45.906,33.485 45.906,110.515 45.906,110.515 45.906,110.515 
	45.906,110.844 46.275,110.844 54.604,118.29 89.396,118.29 97.725,110.844 98.094,110.844 98.094,33.485 "
        />
        <g>
          <polygon
            fill="#D0D1D3"
            points="98.094,33.485 45.906,33.485 54.604,25.71 89.396,25.71 	"
          />
          <polygon
            fill="#D0D1D3"
            points="45.906,110.515 98.094,110.515 89.396,118.29 54.604,118.29 	"
          />
        </g>
        <text
          transform="matrix(4.489659e-011 1.1382 -1 5.110002e-011 82.8145 57.3929)"
          fill="#1F1E24"
          fontFamily="'Shrikhand-Regular'"
          fontSize="15.4662"
        >
          SODA
        </text>
      </svg>
    );
  }
}

export default SodaIcon;
