import React, { Component } from "react";

class SpendCategorySnapshot extends Component {
  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Top Spending Categories</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Category 1: $amount</h4>
          <h4 className="ui sub header">Category 2: $amount</h4>
          <h4 className="ui sub header">Category 3: $amount</h4>
        </div>
      </div>
    );
  }
}

export default SpendCategorySnapshot;
