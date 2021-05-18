import Cookies from "js-cookies";
import * as action_types from "../action_types";
import axios from '../axios';
import { setSuccessMess } from "./supActions";

async function getAuthorsAsync() {
  axios.defaults.headers.common["Authorization"] = ``;
  let films = await axios.get(`http://localhost:8001/get/Authors`);
  return films.data;
}

async function getAuthorAsync(id) {
  axios.defaults.headers.common["Authorization"] = ``;
  let authors = await axios.get(`http://localhost:8001/get/Author/${id}`);
  return authors.data;
}

async function addAuthorAsync(author) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    name: author.name
  };
  let answer = await axios({
    url: `http://localhost:8001/moderator/addAuthor`,
    method: "post",
    data: data
  });
  return answer.status;
}

async function changeAuthorAsync(author) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  await axios({
    url:`http://localhost:8001/moderator/changeAuthor`,
    method:"put",
    data:{
      "id":author.id,
      "name":author.name
    }
  });
}

async function deleteAuthorAsync(author) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  await axios({
    url:`http://localhost:8001/moderator/deleteAuthor`,
    method:"DELETE",
    data:{
      "id": author.id
    }
  });
}

export const getAuthors = () => async(dispatch, reducers) => {
  let authors = await getAuthorsAsync();
  console.log("making getFilms");
  await dispatch({"type" : action_types.AUTHOR_LIST, "data" : authors});
}

export const getAuthor = (id) => async(dispatch, reducers) => {
  let author = await getAuthorAsync(id);
  await dispatch({"type" : action_types.ONE_AUTHOR, "data" : author});
}

export const changeAuthor = (author) => async(dispatch, reducers) => {
  console.log(author);
  await changeAuthorAsync(author);
  setSuccessMess("Change complete")(dispatch, reducers)
  getAuthor(author.id)(dispatch, reducers);
}

export const deleteAuthor = (author) => async(dispatch, reducers) => {
  setSuccessMess("Delete complete")(dispatch, reducers)
  await deleteAuthorAsync(author);
}

export const addAuthor = (author) => async(dispatch, reducers) => {
  let answer = await addAuthorAsync(author);
  console.log(answer);
  if (answer === 200){
    setSuccessMess("Add complete")(dispatch, reducers)
    getAuthors()(dispatch, reducers);
  };
}