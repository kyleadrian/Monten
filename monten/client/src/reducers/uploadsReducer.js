import { UPLOAD_FILE, SELECT_FILE } from "../actions/types";

const INITIAL_STATE = {
  uploading: false,
  message: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        uploading: true
      };
    case UPLOAD_FILE:
      return {
        ...state,
        uploading: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};
