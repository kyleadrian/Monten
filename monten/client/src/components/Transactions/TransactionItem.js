import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchTransaction } from "../../actions";

class TransactionItem extends Component {
  renderActions = () => {
    return (
      <React.Fragment>
        <Link to={`/transactions/${this.props.id}`}>
          <button className="ui button primary">Edit</button>
        </Link>
        <Link to={`/transactions/${this.props.id}`}>
          <button className="ui button">Details</button>
        </Link>
      </React.Fragment>
    );
  };
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.description}</td>
        <td>{this.props.category}</td>
        <td>${this.props.amount}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}

export default connect(
  null,
  { fetchTransaction }
)(TransactionItem);
