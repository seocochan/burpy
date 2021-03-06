import React, { Component } from 'react';

class PhotoIcon extends Component {
  render() {
    const { width = 50, height = 50 } = this.props;

    return (
      <svg
        id="photo-icon"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 144 144"
      >
        <circle fill="#C4C485" cx="72" cy="72" r="72" />
        <path
          fill="#455A64"
          d="M112.509,41.3h-9.456c-0.893-0.001-1.685-0.572-1.967-1.419l-2.27-6.775
	c-0.847-2.537-3.221-4.25-5.896-4.253H69.86c-2.675,0.003-5.049,1.715-5.896,4.253l-2.265,6.775
	c-0.283,0.848-1.077,1.42-1.971,1.419H33.676c-5.729,0-10.373,4.644-10.373,10.373v45.64c0,5.729,4.644,10.373,10.373,10.373h78.833
	c5.729,0,10.373-4.644,10.373-10.373v-45.64C122.882,45.944,118.238,41.3,112.509,41.3z"
        />
        <circle fill="#607D8B" cx="81.391" cy="74.493" r="24.895" />
        <path
          fill="#455A64"
          d="M41.974,37.151h-8.298c-1.146,0-2.075-0.929-2.075-2.075c0-1.146,0.929-2.075,2.075-2.075h8.298
	c1.146,0,2.075,0.929,2.075,2.075C44.049,36.222,43.12,37.151,41.974,37.151z"
        />
        <path
          fill="#FFC107"
          d="M41.974,53.747h-8.298c-1.146,0-2.075-0.929-2.075-2.075s0.929-2.074,2.075-2.074h8.298
	c1.146,0,2.075,0.929,2.075,2.075S43.12,53.747,41.974,53.747z"
        />
        <g>
          <path
            fill="#475F6C"
            d="M81.345,49.888c13.563,0,24.559,10.998,24.559,24.559c0,13.563-10.996,24.559-24.559,24.559
		S56.786,88.011,56.786,74.447C56.785,60.886,67.781,49.888,81.345,49.888z"
          />
          <path
            fill="#2B414D"
            d="M81.345,61.052c7.399,0,13.396,5.999,13.396,13.396c0,7.397-5.997,13.396-13.396,13.396
		c-7.397,0-13.396-5.999-13.396-13.396C67.949,67.051,73.948,61.052,81.345,61.052z"
          />
          <path
            fill="#95A0A6"
            d="M88.043,63.284c2.465,0,4.465,2.001,4.465,4.465c0,2.467-2.001,4.465-4.465,4.465
		c-2.465,0-4.465-1.998-4.465-4.465S85.578,63.284,88.043,63.284z"
          />
          <path
            fill="#EBEBEB"
            d="M81.345,49.888c-13.563,0-24.559,10.998-24.559,24.559c0,13.563,10.996,24.559,24.559,24.559
		s24.559-10.996,24.559-24.559C105.904,60.886,94.91,49.888,81.345,49.888z M81.345,95.658c-11.695,0-21.21-9.516-21.21-21.21
		s9.516-21.21,21.21-21.21s21.21,9.516,21.21,21.21S93.042,95.658,81.345,95.658z"
          />
        </g>
      </svg>
    );
  }
}

export default PhotoIcon;
