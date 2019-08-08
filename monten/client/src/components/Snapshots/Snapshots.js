import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchSnapshot, uploadFile, selectFile } from "../../actions";
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
import { spendDataByMonth } from "../../helpers/chartsHelper";

class Snapshots extends Component {
  componentDidMount() {
    this.props.fetchSnapshot();
  }

  /*   handleDateChange = date => {
    this.setState({ dateRange: date });
  }; */

  onChange = e => {
    const selectedFile = e.target.files[0];
    this.props.selectFile(selectedFile);

    const formData = new FormData();
    formData.append("selectedFile", selectedFile);

    this.props.uploadFile(formData);
  };

  /*   renderCharts(data) {
    if (this.props.isShown.isBankInfoChartShown) {
      return <BankingInformationChart />;
    } else if (this.props.isShown.isNetSpendChartShown) {
      return <NetSpendChart />;
    } else if (this.props.isShown.isTopCategoriesChartShown) {
      return <TopCategoriesChart data={data} />;
    }
  } */

  render() {
    const { netSpendInfo, bankInfo, categoryInfo, name } = this.props.snapshot;
    const { uploading } = this.props.upload;

    if (!categoryInfo) {
      return <Spinner message={"Loading Snapshots"} />;
    } else if (uploading) {
      return <Spinner message={"Uploading Transactions"} />;
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
              <DateRange />
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
          <label for="file" class="big ui red icon button">
            <i class="plus circle icon" />
          </label>
          <input
            type="file"
            id="file"
            name="selectedFile"
            onChange={this.onChange}
            style={{ display: "none" }}
          />
          <div>
            <div className="column" />
          </div>
        </div>
        <div />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShown: state.charts,
    snapshot: state.snapshot,
    upload: state.upload
  };
};

export default connect(
  mapStateToProps,
  { fetchSnapshot, uploadFile, selectFile }
)(requireAuth(Snapshots));
