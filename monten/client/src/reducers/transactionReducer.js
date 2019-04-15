import _ from "lodash";
import { FETCH_TRANSACTIONS, FETCH_TRANSACTION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
