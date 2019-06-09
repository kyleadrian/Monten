import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  showBankInfoChart,
  showNetSpendChart,
  showTopCategoriesChart
} from "../../actions";

class SpendCategorySnapshot extends Component {
  handleShowTopCategoriesChart = () => {
    if (!this.props.isShown.isTopCategoriesChartShown) {
      this.props.showTopCategoriesChart(true);
      this.props.showBankInfoChart(false);
      this.props.showNetSpendChart(false);
    }
  };

  renderCategories = () => {
    const categories = [...this.props.categories];

    return categories.splice(0, 3).map((transaction, index) => {
      return (
        <h4 className="ui sub header" key={transaction.category}>
          <Link to={`/transactions/${transaction.category}`}>
            {1 + index++}: {transaction.category}
          </Link>
        </h4>
      );
    });
  };

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header" onClick={this.handleShowTopCategoriesChart}>
            Top Spending Categories
          </div>
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
