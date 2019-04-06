import React, { Component } from "react";
import NetSpendSnapshot from "./NetSpendSnapshot";
import SpendCategorySnapshot from "./SpendCategorySnapshot";
import BankingInfoSnapshot from "./BankingInfoSnapshot";

class Snapshots extends Component {
  render() {
    return (
      <div>
        <NetSpendSnapshot />
        <SpendCategorySnapshot />
        <BankingInfoSnapshot />
      </div>
    );
  }
}

export default Snapshots;
