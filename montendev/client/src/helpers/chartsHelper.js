import _ from "lodash";
import moment from "moment";

export const spendDataByMonth = transactions => {
  const data = _.chain(transactions)
    .sortBy("date")
    .map(transaction => {
      const month = transaction.date;
    })
    .value();

  return data;
};
