import React, { Component } from "react";
import { connect } from "react-redux";
import { signout } from "../../actions";
import history from "../../history";

class SignOut extends Component {
  componentDidMount() {
    this.props.signout(() => {
      history.push("/");
    });
  }

  render() {
    return <div>See you next time!</div>;
  }
}

export default connect(
  null,
  { signout }
)(SignOut);
