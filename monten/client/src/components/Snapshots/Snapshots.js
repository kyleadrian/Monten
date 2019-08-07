import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSnapshot } from "../../actions";
import NetSpendSnapshot from "./NetSpendSnapshot";
import SpendCategorySnapshot from "./SpendCategorySnapshot";
import BankingInfoSnapshot from "./BankingInfoSnapshot";
import DateRange from "../DateRange";
import Greeting from "../Greeting";
import Spinner from "../Spinner";
import TopCategoriesChart from "../Charts/TopCategoriesChart";
import NetSpendChart from "../Charts/NetSpendChart";
import BankingInformationChart from "../Charts/BankingInformationChart";
import requireAuth from "../../requireAuth";
import { dateRanges } from "../../helpers/dateRangesHelper";
import { spendDataByMonth } from "../../helpers/chartsHelper";

class Snapshots extends Component {
  componentDidMount() {
    this.props.fetchSnapshot();
  }

  state = {
    dateRange: dateRanges.oneMonthAgo
  };

  handleDateChange = date => {
    this.setState({ dateRange: date });
  };

  renderCharts(data) {
    if (this.props.isShown.isBankInfoChartShown) {
      return <BankingInformationChart />;
    } else if (this.props.isShown.isNetSpendChartShown) {
      return <NetSpendChart />;
    } else if (this.props.isShown.isTopCategoriesChartShown) {
      return <TopCategoriesChart data={data} />;
    }
  }

  render() {
    const { netSpendInfo, bankInfo, categoryInfo, name } = this.props.snapshot;

    if (!netSpendInfo) {
      return <Spinner sectionName={"Snapshots"} />;
    }
    // SUPER SUPER IMPORTANT - DON"T START CALLING ANY LOGIC UNTIL THE ASYNC CALLS ARE FINISHED!
    return (
      <Fragment>
        <div className="ui grid">
          <div className="two column row">
            <div className="left aligned column">
              <Greeting name={name} />
            </div>
            <div className="right aligned column">
              <DateRange onDateRangeClick={this.handleDateChange} />
            </div>
          </div>

          <div className="three column row">
            <div className="column">
              <BankingInfoSnapshot bankInfo={bankInfo} />
            </div>
            <div className="column">
              <NetSpendSnapshot netSpendInfo={netSpendInfo} />
            </div>
            <div className="column">
              <SpendCategorySnapshot
                categoryInfo={Object.values(categoryInfo)}
              />
            </div>
          </div>

          <div>
            <div className="column" />
          </div>
        </div>
        <div>
          <button class="big ui red icon button">
            <i class="plus circle icon" />
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShown: state.charts,
    snapshot: state.snapshot
  };
};

export default connect(
  mapStateToProps,
  { fetchSnapshot }
)(requireAuth(Snapshots));
