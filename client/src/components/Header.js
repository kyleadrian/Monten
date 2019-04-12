import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// TODO create function for when page is selected the active class gets addes `{active} item`

class Header extends Component {
  renderAuthLinks() {
    if (!this.props.auth) {
      return (
        <Fragment>
          <Link to="/signup" className="ui item">
            Sign Up
          </Link>
          <Link to="/signin" className="ui item">
            Sign In
          </Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <a href="##" className="ui item">
            Account Info
          </a>
          <Link to="/signout" className="ui item">
            Sign Out
          </Link>
        </Fragment>
      );
    }
  }

  renderHeader = () => {
    return (
      <div className="ui menu">
        <Link to="/" className="item">
          Monten
        </Link>
        <Link to="/transactions" className="item">
          Transactions
        </Link>
        <Link to="/bills" className="item">
          Bills
        </Link>
        <Link to="/knowledge-center" className="item">
          Knowledge Center
        </Link>
        <div className="right menu">{this.renderAuthLinks()}</div>
      </div>
    );
  };

  render() {
    return <div>{this.renderHeader()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Header);
