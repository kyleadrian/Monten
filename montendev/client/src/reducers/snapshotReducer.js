import { FETCH_SNAPSHOT } from "../actions/types";

// Don't forget to always initialize the state that you would like to use otherwise
// you won't be able to access properties on it.
const INITIAL_STATE = {
  name: "",
  bankInfo: "",
  netSpendInfo: "",
  categoryInfo: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SNAPSHOT:
      return {
        ...state,
        name: action.payload.firstName,
        bankInfo: action.payload.bankInfo,
        netSpendInfo: action.payload.netSpendInfo,
        categoryInfo: action.payload.categoryInfo
      };
    default:
      return state;
  }
};
