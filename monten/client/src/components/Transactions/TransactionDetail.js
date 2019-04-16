import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransaction } from "../../actions";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";

class TransactionDetail extends Component {
  componentDidMount() {
    this.props.fetchTransaction(this.props.match.params.id);
  }

  renderContent() {
    const { date } = this.props.transaction;
    const { description } = this.props.transaction;
    const { category } = this.props.transaction;
    const { amount } = this.props.transaction;

    if (!this.props.transaction) {
      return "Could not get transaction details";
    }

    return (
      <div>
        {`Date of purchase: ${date}`}
        <br />
        {`Description: ${description}`}
        <br />
        {`Category: ${category}`}
        <br />
        {`Amount: ${amount}`}
      </div>
    );
  }

  renderActions() {
    return (
      <React.Fragment>
        <button className="ui button primary">Edit Transaction</button>
        <Link to="/transactions">
          <button className="ui button">Close</button>
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        header="Transaction Details"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/transactions")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    transaction: state.transactions[ownProps.match.params.id]
  };
};
export default connect(
  mapStateToProps,
  { fetchTransaction }
)(TransactionDetail);
