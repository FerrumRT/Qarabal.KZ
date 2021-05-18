import * as action_types from "../action_types";
import axios from '../axios';
import Cookies from "js-cookies";
import { setSuccessMess, setErrMess } from "./supActions";

async function auth(email, password){
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    return null;
  });
  let user = await axios.post(`http://localhost:8001/auth`, {email, password});
  console.log(user);
  if(user == null) return null;
  return user.data;
}

async function regisration(fullName, email, password){
  let answer = await axios.post(`http://localhost:8001/register`, {fullName, email, password});
  return answer.data;
}

async function get(){
  if(Cookies.getItem("java_auth")!== null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
    let user = await axios.get(`http://localhost:8001/getUser`)
    .catch(function(error){
      console.log("somesing hapends");
      console.log(error);
      return null;
    });
    if (user === null) return null;
    return user.data;
  }
  return null;
}

export const getCurrentUser = () => async(dispatch, reducers) => {
  let user = await get();
  if (user != null){
    localStorage.setItem("user", JSON.stringify(user));
    await dispatch({"type" : action_types.LOGIN, "data" : user})
  } else {
    console.log("User is null");
    Cookies.removeItem("java_auth");
    localStorage.removeItem("user");
    await dispatch({"type":action_types.DEFAULT});
  }
}

export const login = (email, password) => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.LOADING})
  let user = await auth(email, password);
  await dispatch({"type" : action_types.LOADING})
  if (user !== null){
    if (user.jwtToken !== undefined) { 
      Cookies.setItem("java_auth", user.jwtToken, 7*3600*24);
      localStorage.setItem("user", JSON.stringify(user.userDetails));
      await dispatch({"type" : action_types.LOGIN, "data" : user.userDetails});
    }
    else await dispatch({"type" : action_types.ERR_MESS, "data" : "Wrong email or password"});
  }
  else await dispatch({"type" : action_types.ERR_MESS, "data" : "Wrong email or password"});
}

export const register = (fullName, email, password, rePassword) => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.LOADING});
  if (password !== rePassword)
    await dispatch({"type" : action_types.ERR_MESS, "data" : "Passwords are not same"});
  else {
    let answer = await regisration(fullName, email, password);
    if (answer === "SOMETHING WRONG")
      await dispatch({"type" : action_types.ERR_MESS, "data" : "This email already exists"});
    else{
      await dispatch({"type" : action_types.SUCCESS_MESS, "data" : "Register complete"});
      setSuccessMess("Register complete")(dispatch, reducers);
    }
  }
  await dispatch({"type" : action_types.LOADING});
}

export const logout = () => async(dispatch, reducers) => {
  Cookies.removeItem("java_auth");
  await dispatch({ "type" : action_types.LOGOUT });
}

async function getUsersAsync() {
  if(Cookies.getItem("java_auth")!== null) 
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let users = await axios({
    url: `http://localhost:8001/admin/Users`,
    method: "get"
  });
  if(users === null) return null;
  return users.data;
}

async function getUserAsync(id) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let authors = await axios.get(`http://localhost:8001/admin/getUser/${id}`);
  return authors.data;
}

async function addUserAsync(user) {
  if(Cookies.getItem("java_auth")!== null) 
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    fullName: user.fullName,
    email: user.email,
    password: user.password
  };
  let answer = await axios({
    url: `http://localhost:8001/admin/addUser`,
    method: "post",
    data: data
  }).catch(error=>{return(error)});
  if (answer == null) return null;
  return answer.status;
}

async function changeUserAsync(user) {
  if(Cookies.getItem("java_auth")!== null) 
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  if (user.password === "") user.password = null;
  await axios({
    url:`http://localhost:8001/admin/changeUser`,
    method:"put",
    data:{
      "fullName":user.fullName,
      "email": user.email,
      "password": user.password
    }
  });
}

async function deleteUserAsync(email) {
  if(Cookies.getItem("java_auth")!== null)
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  await axios({
    url:`http://localhost:8001/admin/deleteUser`,
    method:"DELETE",
    data:{
      email
    }
  });
}

async function addRemoveRoleAsync(userId, roleId) {
  if(Cookies.getItem("java_auth")!== null) 
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    userId,
    roleId
  };
  let answer = await axios({
    url: `http://localhost:8001/admin/addRemoveRole`,
    method: "post",
    data: data
  }).catch(error=>{return(error)});

  return(answer.data);
}

export const getUsers = () => async(dispatch, reducers) => {
  let users = await getUsersAsync();
  await dispatch({"type":action_types.USER_LIST, "data":users});
}

export const getUser = (id) => async(dispatch, reducers) => {
  let user = await getUserAsync(id);
  await dispatch({"type" : action_types.ONE_USER, "data" : user});
}

export const changeUser = (user) => async(dispatch, reducers) => {
  await changeUserAsync(user);
  setSuccessMess("Change complete")(dispatch, reducers);
  getUser(user.id)(dispatch, reducers);
}

export const deleteUser = (email) => async(dispatch, reducers) => {
  await deleteUserAsync(email);
  setSuccessMess("Delete complete")(dispatch, reducers);
}

export const addUser = (user) => async(dispatch, reducers) => {
  let answer = await addUserAsync(user);
  console.log(answer);
  if (answer === 200){
    setSuccessMess("Add complete")(dispatch, reducers);
    getUsers()(dispatch, reducers);
  } else {
    setErrMess("Email exists")(dispatch, reducers);
  };
}

export const addRemoveRole = (user_id, role_id) => async(dispatch, reducers) => {
  await addRemoveRoleAsync(user_id, role_id);
  setSuccessMess("Change complete")(dispatch, reducers);
  getUser(user_id)(dispatch, reducers);
}