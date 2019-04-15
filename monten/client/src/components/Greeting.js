import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <h2>Hi {this.props.name}, here's your financial snapshot!</h2>
      </div>
    );
  }
}

export default Welcome;
