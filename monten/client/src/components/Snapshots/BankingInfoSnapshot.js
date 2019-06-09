import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showBankInfoChart,
  showNetSpendChart,
  showTopCategoriesChart
} from "../../actions";

class BankingInfoSnapShot extends Component {
  handleShowBankingInfoChart = () => {
    if (!this.props.isShown.isBankInfoChartShown) {
      this.props.showBankInfoChart(true);
      this.props.showNetSpendChart(false);
      this.props.showTopCategoriesChart(false);
    }
  };

  render() {
    console.log(this.props.isShown.isBankInfoChartShown);
    console.log(this.props.isShown.isNetSpendChartShown);
    console.log(this.props.isShown.isTopCategoriesChartShown);
    return (
      <div className="ui card">
        <div className="content">
          <div
            className="header"
            onClick={() => this.handleShowBankingInfoChart()}
          >
            Banking Information
          </div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Checking: $12,345.64</h4>
          <h4 className="ui sub header">Savings: $43,569.12</h4>
          <h4 className="ui sub header">Investments: $103,274.67</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShown: state.charts
  };
};

export default connect(
  mapStateToProps,
  { showBankInfoChart, showNetSpendChart, showTopCategoriesChart }
)(BankingInfoSnapShot);
