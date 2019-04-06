import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions";
import { NetSpendSnapshot } from "./NetSpendSnapshot";
import SpendCategorySnapshot from "./SpendCategorySnapshot";
import BankingInfoSnapshot from "./BankingInfoSnapshot";
import DateRange from "../DateRange";
import Greeting from "../Greeting";
import {
  calculateIncome,
  calculateExpenses,
  calculateNet,
  dateRanges
} from "../../helpers/netSpendHelper";

class Snapshots extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  state = { dateRange: dateRanges.oneMonthAgo };

  handleDateChange = date => {
    this.setState({ dateRange: date });
  };

  render() {
    const { transactions } = this.props;

    const income = calculateIncome(transactions, this.state.dateRange);

    const expenses = calculateExpenses(transactions, this.state.dateRange);

    const net = calculateNet(transactions);

    return (
      <div>
        <Greeting />
        <DateRange onDateRangeClick={this.handleDateChange} />
        <NetSpendSnapshot
          transactions={transactions}
          income={income}
          expenses={expenses}
          net={net}
        />
        <SpendCategorySnapshot transactions={transactions} />
        <BankingInfoSnapshot />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: Object.values(state.transactions)
  };
};

export default connect(
  mapStateToProps,
  { fetchTransactions }
)(Snapshots);
