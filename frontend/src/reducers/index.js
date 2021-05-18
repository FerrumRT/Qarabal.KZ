import { combineReducers } from "redux";
import user from "./user";
import film from "./film";
import author from "./author";
import role from "./role";
import * as action_types from "../action_types";
import genre from "./genre";

const loadingReducer = (state = false, action) => {
  switch(action.type){
    case action_types.LOADING:
      return !state;
    default: return state;
  }
}

const errMesReducer = (state = "", action) => {
  switch(action.type){
    case action_types.ERR_MESS:
      return action.data;
    default: return state;
  }
}

const successMesReducer = (state = "", action) => {
  switch(action.type){
    case action_types.SUCCESS_MESS:
      return action.data;
    default: return state;
  }
}

export default combineReducers({
  "loading":loadingReducer,
  "errMes":errMesReducer,
  "successMes":successMesReducer,
  user,
  film,
  author,
  genre,
  role
});