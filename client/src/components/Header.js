import React, { Component } from "react";
import { Link } from "react-router-dom";

// TODO create function for when page is selected the active class gets addes `{active} item`
// TODO

class Header extends Component {
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
        <div className="right menu">
          <a href="##" className="ui item">
            Account Info
          </a>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderHeader()}</div>;
  }
}

export default Header;
