import moment from "moment";

export const dateRanges = {
  todaysDate: moment().format("MM/DD/YYYY"),
  oneWeekAgo: moment()
    .subtract(7, "days")
    .calendar(),
  oneMonthAgo: moment()
    .subtract(30, "days")
    .calendar(),
  oneYearAgo: moment()
    .subtract(365, "days")
    .calendar()
};
