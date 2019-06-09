import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  showBankInfoChart,
  showNetSpendChart,
  showTopCategoriesChart
} from "../../actions";

class NetSpendSnapshot extends Component {
  handleShowNetSpendChart = () => {
    if (!this.props.isShown.isNetSpendChartShown) {
      this.props.showNetSpendChart(true);
      this.props.showTopCategoriesChart(false);
      this.props.showBankInfoChart(false);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="ui card">
          <div className="content">
            <div
              className="header"
              onClick={() => {
                this.handleShowNetSpendChart();
              }}
            >
              Net Spend
            </div>
          </div>
          <div className="content">
            <h4 className="ui sub header">Income: ${this.props.income}</h4>
            <h4 className="ui sub header">Spent: ${this.props.expenses}</h4>
            <h4
              className="ui sub header"
              style={{ color: `${this.props.net < 0 ? "red" : "green"}` }}
            >
              Net: ${this.props.net} $
            </h4>
          </div>
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
