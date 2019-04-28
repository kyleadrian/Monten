import React, { Component } from "react";

class SpendCategorySnapshot extends Component {
  renderCategories = () => {
    return this.props.categories.splice(0, 3).map((transaction, index) => {
      return (
        <h4 className="ui sub header" key={transaction.category}>
          {1 + index++}: {transaction.category}
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
