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
    const { categoryInfo } = this.props;

    return categoryInfo.map(month => {
      return month.categories.splice(0, 5).map((category, index) => {
        return (
          <h4 className="ui sub header" key={category.category}>
            <Link to={`/transactions/${category.category}`}>
              {1 + index++}: {category.category}
            </Link>
          </h4>
        );
      });
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
