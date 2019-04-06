import transactions from "../apis/transactions";
import { FETCH_TRANSACTIONS, FETCH_TRANSACTION } from "./types";

export const fetchTransactions = () => async dispatch => {
  const response = await transactions.get("/transactions");

  dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
};

export const fetchTransaction = id => async dispatch => {
  const response = await transactions.get(`/transactions/${id}`);

  dispatch({ type: FETCH_TRANSACTION, payload: response.data });
};
