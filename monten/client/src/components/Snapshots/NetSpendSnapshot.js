import React, { Fragment } from "react";

export const NetSpendSnapshot = props => {
  console.log(Number(props.net));
  return (
    <Fragment>
      <div className="ui card">
        <div className="content">
          <div className="header">Net Spend</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Income: ${props.income}</h4>
          <h4 className="ui sub header">Spent: ${props.expenses}</h4>
          <h4
            className="ui sub header"
            style={{ color: `${props.net < 0 ? "red" : "green"}` }}
          >
            Net: ${props.net} $
          </h4>
        </div>
      </div>
    </Fragment>
  );
};
