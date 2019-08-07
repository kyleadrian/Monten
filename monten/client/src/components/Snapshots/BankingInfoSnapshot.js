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
    const {
      checkingAcctBalance,
      savingsAcctBalance,
      investmentAcctBalance
    } = this.props.bankInfo;

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
          <h4 className="ui sub header">Checking: ${checkingAcctBalance}</h4>
          <h4 className="ui sub header">Savings: ${savingsAcctBalance}</h4>
          <h4 className="ui sub header">
            Investments: ${investmentAcctBalance}
          </h4>
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
