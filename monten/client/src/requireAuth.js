import React, { Component } from "react";
import { connect } from "react-redux";
import history from "./history";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.navigateAway();
    }

    componentDidUpdate() {
      this.navigateAway();
    }

    navigateAway() {
      if (!this.props.auth) {
        history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      auth: state.auth.isAuthenticated
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
