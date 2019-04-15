import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../../actions";
import history from "../../history";

class SignUp extends Component {
  componentDidMount() {}

  onSubmit = formProps => {
    this.props.signup(formProps, () => {
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
            <h1>Hi there! Let's get Started.</h1>
          </div>
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            className="ui large form"
          >
            <div className="ui stacked segment">
              <label>First Name</label>
              <div>
                <Field
                  name="firstName"
                  type="text"
                  component="input"
                  autoComplete="none"
                />
              </div>
              <label>Last Name</label>
              <div>
                <Field
                  name="lastName"
                  type="text"
                  component="input"
                  autoComplete="none"
                />
              </div>

              <label>Email</label>
              <div>
                <Field
                  name="email"
                  type="text"
                  component="input"
                  autoComplete="none"
                />
              </div>

              <label>Password</label>
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
              />
            </div>
            <div>{this.props.errorMessage}</div>
            <button className="ui fluid large blue submit button">
              Sign Up
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
    errorMessage: state.auth.errorMessage
  };
};

export default compose(
  reduxForm({ form: "signup" }),
  connect(
    mapStateToProps,
    { signup }
  )
)(SignUp);
