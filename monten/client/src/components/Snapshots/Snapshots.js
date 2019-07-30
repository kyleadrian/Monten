import React, { Component, Fragment } from "react";
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
import { spendDataByMonth } from "../../helpers/chartsHelper";

class Snapshots extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  state = {
    dateRange: dateRanges.oneMonthAgo
  };

  handleDateChange = date => {
    this.setState({ dateRange: date });
  };

  renderCharts(data) {
    if (this.props.isShown.isBankInfoChartShown) {
      return <BankingInformationChart />;
    } else if (this.props.isShown.isNetSpendChartShown) {
      return <NetSpendChart />;
    } else if (this.props.isShown.isTopCategoriesChartShown) {
      return <TopCategoriesChart data={data} />;
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

    const spendData = spendDataByMonth(transactions);

    const financialData = {
      income,
      expenses,
      net,
      orderedCategories
    };

    return (
      <Fragment>
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
                income={financialData.income.toLocaleString()}
                expenses={financialData.expenses.toLocaleString()}
                net={financialData.net}
              />
            </div>
            <div className="column">
              <SpendCategorySnapshot
                categories={financialData.orderedCategories}
              />
            </div>
          </div>

          <div>
            <div className="column">
              {this.renderCharts(financialData.orderedCategories)}
            </div>
          </div>
        </div>
        <div>
          <button class="big ui red icon button">
            <i class="plus circle icon" />
          </button>
        </div>
      </Fragment>
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
