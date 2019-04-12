import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../../actions";
import history from "../../history";

class SignIn extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      history.push("/");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In</button>
      </form>
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
