import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions";
import NetSpendSnapshot from "./NetSpendSnapshot";
import SpendCategorySnapshot from "./SpendCategorySnapshot";
import BankingInfoSnapshot from "./BankingInfoSnapshot";
import DateRange from "../DateRange";
import Greeting from "../Greeting";
import Spinner from "../Spinner";
import TopCategoriesChart from "../Charts/TopCategoriesChart";
import NetSpendChart from "../Charts/NetSpendChart";
import BankingInformationChart from "../Charts/BankingInformationChart";
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
    console.log(this.props.isShown);
  }

  state = {
    dateRange: dateRanges.oneMonthAgo
  };

  renderCharts() {
    if (this.props.isShown.isBankInfoChartShown) {
      return <BankingInformationChart />;
    } else if (this.props.isShown.isNetSpendChartShown) {
      return <NetSpendChart />;
    } else if (this.props.isShown.isTopCategoriesChartShown) {
      return <TopCategoriesChart />;
    }
  }

  render() {
    const { transactions } = this.props;

    if (transactions.length === 0) {
      return <Spinner sectionName={"Snapshots"} />;
    }
    // SUPER SUPER IMPORTANT - DON"T START CALLING ANY LOGIC UNTIL THE ASYNC CALLS ARE FINISHED!
    const income = calculateIncome(transactions, this.state.dateRange);
    const expenses = calculateExpenses(transactions, this.state.dateRange);
    const net = income - expenses;

    const orderedCategories = topSpendCategories(
      transactions,
      this.state.dateRange
    );

    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="left aligned column">
            <Greeting name={this.props.name} />
          </div>
          <div className="right aligned column">
            <DateRange onDateRangeClick={this.handleDateChange} />
          </div>
        </div>

        <div className="three column row">
          <div className="column">
            <BankingInfoSnapshot />
          </div>
          <div className="column">
            <NetSpendSnapshot
              income={income.toLocaleString()}
              expenses={expenses.toLocaleString()}
              net={net}
            />
          </div>
          <div className="column">
            <SpendCategorySnapshot categories={orderedCategories} />
          </div>
        </div>

        <div>
          <div className="column">{this.renderCharts()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: Object.values(state.transactions),
    name: state.auth.name,
    isShown: state.charts
  };
};

export default connect(
  mapStateToProps,
  { fetchTransactions }
)(requireAuth(Snapshots));
