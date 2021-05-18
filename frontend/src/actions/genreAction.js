import Cookies from "js-cookies";
import * as action_types from "../action_types";
import axios from '../axios';
import { setSuccessMess } from "./supActions";


async function getGenresAsync() {
  axios.defaults.headers.common["Authorization"] = ``;
  let genres = await axios({
    url: `http://localhost:8001/get/Genres`,
    method: "get"
  });
  return genres.data;
}

async function getGenreAsync(id) {
  axios.defaults.headers.common["Authorization"] = ``;
  let authors = await axios.get(`http://localhost:8001/get/Genre/${id}`);
  return authors.data;
}

async function addGenreAsync(genre) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    genre: genre.name
  };
  let answer = await axios({
    url: `http://localhost:8001/moderator/addGenre`,
    method: "post",
    data: data
  });
  return answer.status;
}

async function changeGenreAsync(genre) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  await axios({
    url:`http://localhost:8001/moderator/changeGenre`,
    method:"put",
    data:{
      "id":genre.id,
      "genre":genre.name
    }
  });
}

async function deleteGenreAsync(genre) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  await axios({
    url:`http://localhost:8001/moderator/deleteGenre`,
    method:"DELETE",
    data:{
      "id": genre.id
    }
  });
}

export const getGenres = () => async(dispatch, reducers) => {
  let genres = await getGenresAsync();
  await dispatch({"type":action_types.GENRE_LIST, "data":genres});
}


export const getGenre = (id) => async(dispatch, reducers) => {
  let genre = await getGenreAsync(id);
  await dispatch({"type" : action_types.ONE_GENRE, "data" : genre});
}

export const changeGenre = (genre) => async(dispatch, reducers) => {
  await changeGenreAsync(genre);
  setSuccessMess("Change complete")(dispatch, reducers);
  getGenre(genre.id)(dispatch, reducers);
}

export const deleteGenre = (genre) => async(dispatch, reducers) => {
  setSuccessMess("Delete complete")(dispatch, reducers);
  await deleteGenreAsync(genre);
}

export const addGenre = (genre) => async(dispatch, reducers) => {
  let answer = await addGenreAsync(genre);
  console.log(answer);
  if (answer === 200){
    setSuccessMess("Add complete")(dispatch, reducers);
    getGenres()(dispatch, reducers);
  };
}