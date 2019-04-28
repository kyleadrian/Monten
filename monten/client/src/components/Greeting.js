import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginTop: "10px" }}>
          Hi {this.props.name}, here's your financial snapshot!
        </h2>
      </div>
    );
  }
}

export default Welcome;
