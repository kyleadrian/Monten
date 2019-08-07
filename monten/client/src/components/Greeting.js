import React, { Component } from "react";
import moment from "moment";

class Welcome extends Component {
  month = moment()
    .subtract(1, "months")
    .format("MMMM");

  render() {
    return (
      <div>
        <h2 style={{ marginTop: "10px" }}>
          Hi {this.props.name}, here's your financial snapshot for {this.month}.
        </h2>
      </div>
    );
  }
}

export default Welcome;
