import React, { Component } from "react";

class BankingInfoSnapShot extends Component {
  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Banking Information</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Checking: $amount</h4>
          <h4 className="ui sub header">Savings: $amount</h4>
        </div>
      </div>
    );
  }
}
export default BankingInfoSnapShot;
