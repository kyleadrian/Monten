import React, { Component } from "react";

class BankingInfoSnapShot extends Component {
  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">Banking Information</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Checking: $12,345.64</h4>
          <h4 className="ui sub header">Savings: $43,569.12</h4>
          <h4 className="ui sub header">Investments: $103,274.67</h4>
        </div>
      </div>
    );
  }
}
export default BankingInfoSnapShot;
