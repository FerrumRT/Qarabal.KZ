import { combineReducers } from "redux";
import * as action_types from "../action_types";

const anonimous = {
  id: -1,
  name: "NoOne",
  email: "noOne@noOne.com"
}

const getCurrentUser = () => {
  let user = {
    is_authorized: false,
    is_admin: false,
    is_moderator: false,
    data: anonimous
  };
  if (localStorage.getItem("user") !== null) {
    user.data = JSON.parse(localStorage.getItem("user"));
    user.is_authorized = true;
    user.is_admin = user.data.roles.some(({role})=>role === "ROLE_ADMIN");
    user.is_moderator = user.data.roles.some(({role})=>role === "ROLE_MODERATOR");
  }
  return user;
}

const user = getCurrentUser();

const details = (state = user.data, action) => {
  switch (action.type){
    case action_types.LOGIN:
      let user = action.data;
      return user;
    case action_types.LOGOUT:
      return anonimous;
    case action_types.DEFAULT:
      return {
        is_authorized: false,
        is_admin: false,
        is_moderator: false,
        data: anonimous
      };
    default: return state;
  }
}

const is_authorized = (state = user.is_authorized, action) => {
  switch (action.type) {
    case action_types.LOGIN:
      return true;
    case action_types.LOGOUT:
      return false;
    case action_types.DEFAULT:
      return false;
    default: return state;
  }
}

const is_admin = (state = user.is_admin, action) => {
  switch (action.type) {
    case action_types.LOGIN:
      return action.data.roles.some(({role})=>role === "ROLE_ADMIN");
    case action_types.LOGOUT:
      return false;
    case action_types.DEFAULT:
      return false;
    default: return state;
  }
}

const is_moderator = (state = user.is_moderator, action) => {
  switch (action.type) {
    case action_types.LOGIN:
      return action.data.roles.some(({role})=>role === "ROLE_MODERATOR");
    case action_types.LOGOUT:
      return false;
    case action_types.DEFAULT:
      return false;
    default: return state;
  }
}

const list = (state = [], action) => {
  switch(action.type){
    case action_types.USER_LIST:
      return action.data;
    case action_types.ONE_USER:
      return [];
    case action_types.LOGOUT:
      return [];
    default:
      return state;
  }
}

const one = (state = {}, action) => {
  switch(action.type){
    case action_types.USER_LIST:
      return {};
    case action_types.ONE_USER:
      return action.data;
    case action_types.LOGOUT:
      return {};
    default: return state;
  }
}

export default combineReducers({
  details,
  list,
  one,
  is_authorized,
  is_admin,
  is_moderator
});