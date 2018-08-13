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

    return (
      <RadarChart outerRadius={70} width={192} height={192} data={data}>
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
    const { classes, product } = this.props;

    if (!product) {
      return <div />;
    }

    return (
      <div className={classes.container}>
        <Typography variant="subheading">맛 수치</Typography>
        <div className={classes.chartContainer}>{this.renderChart()}</div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: 'auto'
  },
  chartContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default withStyles(styles)(ProductTastesInfo);
