import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Checking", value: 12345.64 },
  { name: "Savings", value: 43569.12 },
  { name: "Investments", value: 103274.67 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class BankingInfoChart extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/3Leoa7f4/";

  render() {
    return (
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

export default BankingInfoChart;
