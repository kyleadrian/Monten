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
        <button>Sign Up</button>
      </form>
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
