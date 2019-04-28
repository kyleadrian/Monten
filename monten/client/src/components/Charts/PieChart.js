import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class Example extends Component {
  render() {
    const { data } = this.props;

    return (
      <PieChart width={1000} height={1000}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
