import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  showBankInfoChart,
  showNetSpendChart,
  showTopCategoriesChart
} from "../../actions";
import { formatAmount } from "../../helpers/formatter";

class SpendCategorySnapshot extends Component {
  handleShowTopCategoriesChart = () => {
    if (!this.props.isShown.isTopCategoriesChartShown) {
      this.props.showTopCategoriesChart(true);
      this.props.showBankInfoChart(false);
      this.props.showNetSpendChart(false);
    }
  };

  renderCategories = () => {
    const { categoryInfo } = this.props;

    return categoryInfo.map(month => {
      return month.categories.map(({ category, amount }, index) => {
        return (
          <h4 className="ui sub header" key={category}>
            {1 + index++}:
            <Link to={`/transactions/${category}`}> {category}</Link>- $
            {formatAmount(amount.toFixed(2) / 100)}
          </h4>
        );
      });
    });
  };

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Top Spending Categories</div>
        </div>
        <div className="content">{this.renderCategories()}</div>
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
)(SpendCategorySnapshot);
