import React, { Component } from "react";
import { dateRanges } from "../helpers/dateRangesHelper";

class DateRange extends Component {
  handleDateChange = date => {
    this.props.onDateRangeClick(date);
  };

  render() {
    return (
      <div className="ui buttons" style={{ marginTop: "10px" }}>
        <button className="ui button">Week</button>
        <button className="ui button">Month</button>
        <button className="ui button">Year</button>
      </div>
    );
  }
}

export default DateRange;
