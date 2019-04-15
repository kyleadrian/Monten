import React, { Component } from "react";
import { dateRanges } from "../helpers/netSpendHelper";

class DateRange extends Component {
  handleDateChange = date => {
    this.props.onDateRangeClick(date);
  };

  render() {
    return (
      <div className="ui buttons">
        <button
          onClick={() => this.handleDateChange(dateRanges.todaysDate)}
          className="ui button"
        >
          D
        </button>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneWeekAgo)}
          className="ui button"
        >
          W
        </button>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneMonthAgo)}
          className="ui button"
        >
          M
        </button>
        <button
          onClick={() => this.handleDateChange(dateRanges.oneYearAgo)}
          className="ui button"
        >
          Y
        </button>
      </div>
    );
  }
}

export default DateRange;
