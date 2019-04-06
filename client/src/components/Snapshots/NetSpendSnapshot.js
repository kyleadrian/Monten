import _ from "lodash";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions";

// To do refactor this component to be the page that renders all of the cards with the data. For instance spending card, networth card, graph of increase in spend etc.

class Snapshot extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  calculateIncome = transactions => {
    const income = _.chain(transactions)
      .filter(transaction => {
        if (
          transaction.category === "Paycheck" &&
          moment(transaction.date).format("MM/DD/YYYY") >= "03/01/2019"
          // moment(moment().subtract(30, "days")).format("MM/DD/YYYY")
        )
          console.log(transaction);
        /* return transaction; */
      })
      .map(transaction => {
        return transaction.amount;
      })
      .sum()
      .value();

    return income.toFixed(2);
  };

  calculateExpenses = transactions => {
    // TO DO find a way to refactor;
    const toRemove = [];

    _.map(transactions, transaction => {
      if (
        transaction.category === "Credit Card Payment" ||
        transaction.category === "Transfer"
      ) {
        toRemove.push(transaction);
      }
    });

    const filteredTransactions = _.filter(transactions, transaction => {
      return !toRemove.includes(transaction);
    });

    const totalSpent = _.chain(filteredTransactions)
      .map(transaction => {
        return transaction.amount;
      })
      .sum()
      .value();

    return totalSpent.toFixed(2);
  };

  calculateNet = () => {
    const income = this.calculateIncome(this.props.transactions);
    const expenses = this.calculateExpenses(this.props.transactions);

    return (income - expenses).toFixed(2);
  };

  render() {
    console.log(moment(moment().subtract(30, "days")).format("MM/DD/YYYY"));
    if (!this.props.transactions) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <div>
          <h2 style={{ marginTop: "10px" }}>
            Hi Kyle, here's your financial snapshot!
          </h2>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">Net Spend</div>
          </div>
          <div className="content">
            <h4 className="ui sub header">
              Income: ${this.calculateIncome(this.props.transactions)}
            </h4>
            <h4 className="ui sub header">
              Spent: ${this.calculateExpenses(this.props.transactions)}
            </h4>
            <h4 className="ui sub header">Net: ${this.calculateNet()}</h4>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: Object.values(state.transactions) // this converts our transactions objects into arrays.
  };
};

export default connect(
  mapStateToProps,
  { fetchTransactions }
)(Snapshot);
