import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../../actions";
import history from "../../history";

class SignIn extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      history.push("/snapshots");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div
        className="ui middle aligned center aligned grid"
        style={{ marginTop: "10%" }}
      >
        <div>
          <div className="content" style={{ marginBottom: "20px" }}>
            <h1>Welcome back! Login below.</h1>
          </div>
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            className="ui large form"
          >
            <div className="ui stacked segment">
              <div className="field">
                <div className=" ui left icon input">
                  <i className="user icon" />
                  <Field
                    className="field"
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="field">
                <div className=" ui left icon input">
                  <i className="lock icon" />
                  <Field
                    name="password"
                    type="password"
                    component="input"
                    autoComplete="none"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>{this.props.errorMessage}</div>
            <button className="ui fluid large blue submit button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // we only neeed the error message here because on signup, user is not authenticated as yet but an error on sign up can occur
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default compose(
  reduxForm({ form: "signin" }),
  connect(
    mapStateToProps,
    { signin }
  )
)(SignIn);
