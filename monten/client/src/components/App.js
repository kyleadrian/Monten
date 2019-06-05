import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TransactionList from "./Transactions/TransactionList";
import TransactionDetail from "./Transactions/TransactionDetail";
import Snapshots from "./Snapshots/Snapshots";
import Header from "./Header";
import history from "../history";
import Bills from "./Bills";
import Knowledge from "./Knowledge";
import SignUp from "./auth/SignUp";
import SignOut from "./auth/SignOut";
import SignIn from "./auth/SignIn";
import WelcomePage from "./WelcomePage";

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
            <Route path="/" exact component={WelcomePage} />
            <Route path="/snapshots" exact component={Snapshots} />
            <Route path="/transactions" exact component={TransactionList} />
            <Route
              path="/transactions/:category"
              exact
              component={TransactionList}
            />
            <Route
              path="/transactions/:id"
              exact
              component={TransactionDetail}
            />
            <Route path="/bills" exact component={Bills} />
            <Route path="/knowledge-center" exact component={Knowledge} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signout" exact component={SignOut} />
            <Route path="/signin" exact component={SignIn} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
