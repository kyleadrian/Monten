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

  formatNames(value) {
    switch (value) {
      case "checkingAcctBalance":
        return "Checking";
      case "savingsAcctBalance":
        return "Savings";
      case "investmentAcctBalance":
        return "Investments";
      default:
        return "null";
    }
  }

  renderBankInfo = () => {
    return Object.entries(this.props.bankInfo).map(value => {
      return (
        <h4 key={value[0]} className="ui sub header">
          {this.formatNames(value[0])}: ${value[1] / 100}
        </h4>
      );
    });
  };

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Banking Information</div>
        </div>
        <div className="content">{this.renderBankInfo()}</div>
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
