import { combineReducers } from "redux";
import * as action_types from "../action_types";

const list = (state = [], action) => {
  switch(action.type){
    case action_types.AUTHOR_LIST:
      return action.data;
    case action_types.ONE_AUTHOR:
      return [];
    default:
      return state;
  }
}

const details = (state = {}, action) => {
  switch(action.type){
    case action_types.AUTHOR_LIST:
      return {};
    case action_types.ONE_AUTHOR:
      return action.data;
    default: return state;
  }
}

export default combineReducers({
  list,
  details
})