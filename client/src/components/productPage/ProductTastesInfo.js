import React, { Component, Fragment } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import category from '../../assets/datas/productCategoryDict';

class ProductTastesInfo extends Component {
  processData(tasteArray) {
    const tasteNames = category[this.props.product.category].params;

    return tasteArray.map((item, i) => ({ name: tasteNames[i], value: item }));
  }

  renderChart() {
    const { avgTaste } = this.props.product;
    const data = this.processData(avgTaste);
    console.log(data);

    return (
      <RadarChart outerRadius={80} width={240} height={240} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis
          type="number"
          domain={[0, 5]}
          angle={15}
          axisLine={false}
          scale="linear"
        />
        <Radar
          dataKey="value"
          stroke="#ffa826"
          fill="#ffc126"
          fillOpacity={0.4}
        />
      </RadarChart>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return (
      <div>
        <Typography variant="subheading">맛 수치</Typography>
        {this.renderChart()}
      </div>
    );
  }
}

const styles = theme => ({
  //
});

export default withStyles(styles)(ProductTastesInfo);
