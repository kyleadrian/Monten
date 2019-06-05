import React, { Component } from "react";
import { Link } from "react-router-dom";

class SpendCategorySnapshot extends Component {
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
          <div className="header">Top Spending Categories</div>
        </div>
        <div className="content">{this.renderCategories()}</div>
      </div>
    );
  }
}

export default SpendCategorySnapshot;
