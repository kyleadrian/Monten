import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TransactionList from "./Transactions/TransactionList";
import TransactionDetail from "./Transactions/TransactionDetail";
import Snapshots from "./Snapshots/Snapshots";
import Header from "./Header";
import history from "../history";
import Bills from "./Bills";

export default () => {
  return (
    <div
      className="ui container"
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      <Router history={history}>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Snapshots} />
            <Route path="/transactions" exact component={TransactionList} />
            <Route
              path="/transactions/:id"
              exact
              component={TransactionDetail}
            />
            <Route path="/bills" exact component={Bills} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
