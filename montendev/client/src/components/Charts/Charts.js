import React, { Component } from "react";
import BankingInformationChart from "./BankingInformationChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

class Charts extends Component {
  state = {
    isBankInfoChartShown: false,
    isNetSpendChartShown: true,
    isTopCategoriesChartShown: false
  };

  renderCharts() {
    if (this.state.isBankInfoChartShown) {
      return <BankingInformationChart />;
    } else if (this.state.isNetSpendChartShown) {
      return <PieChart />;
    } else {
      return <LineChart />;
    }
  }

  render() {
    return <div>{this.renderCharts()}</div>;
  }
}
export default Charts;
