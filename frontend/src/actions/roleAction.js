import * as action_types from "../action_types";
import axios from '../axios';
import Cookies from "js-cookies";

async function getRolesAsync() {
  if(Cookies.getItem("java_auth")!== null) 
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let roles = await axios({
    url: `http://localhost:8001/get/Roles`,
    method: "get"
  });
  if(roles === null) return null;
  return roles.data;
}

export const getAllRoles = () => async(dispatch, reducers) => {
  let roles = await getRolesAsync();
  await dispatch({"type": action_types.ROLE_LIST, "data": roles});
}