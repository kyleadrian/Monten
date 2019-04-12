import transactions from "../apis/transactions";
import auth from "../apis/auth";
import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  AUTH_USER,
  AUTH_ERROR
} from "./types";

export const fetchTransactions = () => async dispatch => {
  const response = await transactions.get("/transactions");

  dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
};

export const fetchTransaction = id => async dispatch => {
  const response = await transactions.get(`/transactions/${id}`);

  dispatch({ type: FETCH_TRANSACTION, payload: response.data });
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await auth.post("/signup", formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Email is already in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await auth.post("/signin", formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Incorrect login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return { type: AUTH_USER, payload: "" };
};
