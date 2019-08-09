import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// TODO create function for when page is selected the active class gets addes `{active} item`

class Header extends Component {
  renderAppLinks() {
    if (this.props.auth) {
      return (
        <Fragment>
          <Link to="/transactions" className="ui item">
            Transactions
          </Link>
          <Link to="/bills" className="ui item">
            Bills
          </Link>
          <Link to="/knowledge-center" className="ui item">
            Knowledge Center
          </Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Link to="#" className="ui item">
            How it works
          </Link>
          <Link to="#" className="ui item">
            Our Mission
          </Link>
          <Link to="#" className="ui item">
            About Us
          </Link>
          <Link to="#" className="ui item">
            Help
          </Link>
        </Fragment>
      );
    }
  }

  renderAuthLinks() {
    if (!this.props.auth) {
      return (
        <Fragment>
          <Link to="/signup" className="ui item">
            Get Started
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
        <Link to={this.props.auth ? "/snapshots" : "/"} className="item">
          Monten
        </Link>
        {this.renderAppLinks()}
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
