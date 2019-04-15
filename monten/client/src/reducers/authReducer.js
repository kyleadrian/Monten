import { AUTH_USER, AUTH_ERROR, GET_NAME } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: "",
  errorMessage: "",
  signOutSuccess: "",
  name: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
