import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  showBankInfoChart,
  showNetSpendChart,
  showTopCategoriesChart
} from "../../actions";

class NetSpendSnapshot extends Component {
  formatAmount = number => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  handleShowNetSpendChart = () => {
    if (!this.props.isShown.isNetSpendChartShown) {
      this.props.showNetSpendChart(true);
      this.props.showTopCategoriesChart(false);
      this.props.showBankInfoChart(false);
    }
  };

  renderNetSpend() {
    return Object.entries(this.props.netSpendInfo).map(value => {
      return (
        <h4 key={value[0]} className="ui sub header">
          {value[0]}: ${this.formatAmount(value[1])}
        </h4>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div className="ui card">
          <div className="content">
            <div className="header">Net Spend</div>
          </div>
          <div className="content">{this.renderNetSpend()}</div>
        </div>
      </Fragment>
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
)(NetSpendSnapshot);
