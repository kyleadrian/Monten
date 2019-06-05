import React, { Component } from "react";
import { dateRanges } from "../helpers/dateRangesHelper";

class DateRange extends Component {
  handleDateChange = date => {
    this.props.onDateRangeClick(date);
  };

  render() {
    return (
      <div className="ui buttons" style={{ marginTop: "10px" }}>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneWeekAgo)}
          className="ui button"
        >
          Week
        </button>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneMonthAgo)}
          className="ui button"
        >
          Month
        </button>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneYearAgo)}
          className="ui button"
        >
          Year
        </button>
      </div>
    );
  }
}

export default DateRange;
