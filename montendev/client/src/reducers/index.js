import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import transactionReducer from "./transactionReducer";
import authReducer from "./authReducer";
import chartReducer from "./chartReducer";
import snapshotReducer from "./snapshotReducer";
import uploadsReducer from "./uploadsReducer";

export default combineReducers({
  transactions: transactionReducer,
  auth: authReducer,
  // DON"T FORGET WHEN USING REDUX FORM TO IMPORT FORM REDUCER OTHERWISE YOU WON"T BE ABLE TO TYPE
  // IN THE FIELDS!!!
  form: formReducer,
  charts: chartReducer,
  snapshot: snapshotReducer,
  upload: uploadsReducer
});
