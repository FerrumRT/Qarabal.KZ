import { combineReducers } from "redux";
import * as action_types from "../action_types";

const list = (state = [], action) => {
  switch(action.type) {
    case action_types.ROLE_LIST:
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  list
})