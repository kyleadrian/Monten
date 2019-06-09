import {
  SHOW_BANKINFOCHART,
  SHOW_NETSPENDCHART,
  SHOW_TOPCATEGORIESCHART
} from "../actions/types";

const INITIAL_STATE = {
  isBankInfoChartShown: true,
  isNetSpendChartShown: false,
  isTopCategoriesChartShown: false
};

// Doubts about whether this is the best way to go about doing this. Please double check if it is.
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_BANKINFOCHART:
      return { ...state, isBankInfoChartShown: action.payload };
    case SHOW_NETSPENDCHART:
      return { ...state, isNetSpendChartShown: action.payload };
    case SHOW_TOPCATEGORIESCHART:
      return { ...state, isTopCategoriesChartShown: action.payload };
    default:
      return state;
  }
};
