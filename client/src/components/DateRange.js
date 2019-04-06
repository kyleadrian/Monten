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
          Day
        </button>
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
