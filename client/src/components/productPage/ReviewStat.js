import React, { Component } from 'react';
import { BarChart, Bar, LabelList, XAxis, Cell } from 'recharts';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class ReviewStat extends Component {
  colors = ['#ffda00', , , , ,].fill('#ede9d5', 1);

  sumArray(countArray) {
    return countArray.reduce((sum, x) => sum + x);
  }

  processData(countArray) {
    const countSum = this.sumArray(countArray);

    let data = [];
    for (let i = 4; i >= 0; i--) {
      data.push({
        name: `${i + 1}점`,
        count: countArray[i],
        rate:
          countSum === 0
            ? '0%'
            : `${Math.trunc((countArray[i] / countSum) * 100)}%`
      });
    }

    return data;
  }

  renderChart() {
    const data = this.processData(this.props.product.reviewCount);

    return (
      <BarChart
        width={320}
        height={180}
        data={data}
        margin={{ top: 32, right: 16, left: 16, bottom: 8 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Bar dataKey="count" fill="#8884d8" minPointSize={10}>
          <LabelList
            dataKey="rate"
            position="top"
            fill={'#666666'}
            fontSize={12}
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={this.colors[index]} />
          ))}
        </Bar>
      </BarChart>
    );
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div />;
    }

    return (
      <div>
        <Typography variant="subheading">평점 분포</Typography>
        <Typography variant="caption">
          평균 {product.avgScore.toFixed(1)} / 5.0 ({this.sumArray(
            product.reviewCount
          )}명)
        </Typography>
        {this.renderChart()}
      </div>
    );
  }
}

const styles = theme => ({
  //
});

export default withStyles(styles)(ReviewStat);
