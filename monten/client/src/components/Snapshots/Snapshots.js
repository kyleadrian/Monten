import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions";
import { NetSpendSnapshot } from "./NetSpendSnapshot";
import SpendCategorySnapshot from "./SpendCategorySnapshot";
import BankingInfoSnapshot from "./BankingInfoSnapshot";
import DateRange from "../DateRange";
import Greeting from "../Greeting";
import Spinner from "../Spinner";
import requireAuth from "../../requireAuth";
import { dateRanges } from "../../helpers/dateRangesHelper";
import {
  calculateIncome,
  calculateExpenses,
  topSpendCategories
} from "../../helpers/snapshotHelper";

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

    if (transactions.length === 0) {
      return <Spinner sectionName={"Snapshots"} />;
    }
    // SUPER SUPER IMPORTANT - DON"T START CALLING ANY LOGIC UNTIL THE ASYNC CALLS ARE FINISHED!
    const income = calculateIncome(transactions, this.state.dateRange);
    const expenses = calculateExpenses(transactions, this.state.dateRange);
    const net = income - expenses;

    const orderedCategories = topSpendCategories(transactions);

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px "
          }}
        >
          <Greeting name={this.props.name} />
          <DateRange onDateRangeClick={this.handleDateChange} />
        </div>
        <div
          className="ui stackable equal width grid"
          style={{ marginTop: "10px" }}
        >
          <div className="column">
            <BankingInfoSnapshot />
          </div>
          <div className="column">
            <NetSpendSnapshot
              income={income.toLocaleString()}
              expenses={expenses.toLocaleString()}
              net={net.toLocaleString()}
            />
          </div>
          <div className="column">
            <SpendCategorySnapshot categories={orderedCategories} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: Object.values(state.transactions),
    name: state.auth.name
  };
};

export default connect(
  mapStateToProps,
  { fetchTransactions }
)(requireAuth(Snapshots));
