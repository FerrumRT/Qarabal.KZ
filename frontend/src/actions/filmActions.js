import Cookies from "js-cookies";
import * as action_types from "../action_types";
import axios from '../axios';
import { removeSuccessMess, setSuccessMess } from "./supActions";

async function filmPhotoAsync(film_id, photo){
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = new FormData();
  data.append('file', photo);
  await axios({
    url: `http://localhost:8001/moderator/addFilmPhoto/${film_id}`,
    method: "post",
    data: data
  });
}

async function getFilmsAsync(search) {
  axios.defaults.headers.common["Authorization"] = ``;
  let films = await axios.get(`http://localhost:8001/get/Films?search=${search}`);
  console.log(films.data);
  return films.data;
}

async function getFilmAsync(id) {
  axios.defaults.headers.common["Authorization"] = ``;
  let films = await axios.get(`http://localhost:8001/get/Film/${id}`);
  console.log(films.data);
  return films.data;
}

async function addFilmAsync(film) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  console.log(film.photo);
  let data = {
    "title":film.title,
    "author_id":film.author,
    "description":film.description,
    "type":film.type,
    "release_date":film.releaseDate
  };
  let new_film = await axios({
    url: `http://localhost:8001/moderator/addFilm`,
    method: "post",
    data: data
  });
  return new_film.data;
}

async function changeFilmAsync(film) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  await axios({
    url:`http://localhost:8001/moderator/changeFilm`,
    method:"put",
    data:{
      "id":film.id,
      "title":film.title,
      "author_id":film.author,
      "description":film.description,
      "type":film.type,
      "release_date":film.releaseDate
    }
  });
  console.log();
}

async function deleteFilmAsync(film) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  let status = await axios({
    url:`http://localhost:8001/moderator/deleteFilm`,
    method:"DELETE",
    data:{
      "id": film.id
    }
  });
}

async function addFilmSourceAsync(filmSource) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    "name":filmSource.name,
    "filmId":filmSource.film_id,
    "url":filmSource.url
  };
  await axios({
    url: `http://localhost:8001/moderator/addFilmSource`,
    method: "post",
    data: data
  });
}

async function deleteFilmSourceAsync(id) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    id
  };
  await axios({
    url: `http://localhost:8001/moderator/deleteFilmSource`,
    method: "post",
    data: data
  });
}

async function addRemoveGenreAsync(film_id, id) {
  if(Cookies.getItem("java_auth")!== null) 
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.getItem("java_auth")}`;
  let data = {
    film_id,
    "foreign_id": id
  };
  await axios({
    url: `http://localhost:8001/moderator/addRemoveGenre`,
    method: "post",
    data: data
  });
}

export const filmPhoto = (film_id, photo) => async(dispatch, reducers) => {
  await filmPhotoAsync(film_id, photo);
  setSuccessMess("Add complete")(dispatch, reducers);
  getFilm(film_id)(dispatch, reducers);
}

export const getFilms = (search) => async(dispatch, reducers) => {
  let films = await getFilmsAsync(search);
  await dispatch({"type" : action_types.FILM_LIST, "data" : films});
}

export const getFilm = (id) => async(dispatch, reducers) => {
  let film = await getFilmAsync(id);
  await dispatch({"type" : action_types.ONE_FILM, "data" : film});
}

export const changeFilm = (film) => async(dispatch, reducers) => {
  console.log(film);
  await changeFilmAsync(film);
  setSuccessMess("Change complete")(dispatch, reducers);
  getFilm(film.id)(dispatch, reducers);
}

export const deleteFilm = (film) => async(dispatch, reducers) => {
  setSuccessMess("Delete complete")(dispatch, reducers);
  await deleteFilmAsync(film);
}

export const addFilm = (film) => async(dispatch, reducers) => {
  let new_film = await addFilmAsync(film);
  await filmPhotoAsync(new_film.id, film.photo);
  setSuccessMess("Add complete")(dispatch, reducers);
  getFilms()(dispatch, reducers);
}

export const addFilmSource = (filmSource) => async(dispatch, reducers) => {
  await addFilmSourceAsync(filmSource);
  setSuccessMess("Add complete")(dispatch, reducers);
  getFilm(filmSource.film_id)(dispatch, reducers);
}

export const deleteFilmSource = (id, filmId) => async(dispatch, reducers) => {
  await deleteFilmSourceAsync(id);
  setSuccessMess("Delete complete")(dispatch, reducers);
  getFilm(filmId)(dispatch, reducers);
}

export const addFilmGenre = (film_id, id) => async(dispatch, reducers) => {
  await addRemoveGenreAsync(film_id, id);
  setSuccessMess("Add complete")(dispatch, reducers);
  getFilm(film_id)(dispatch, reducers);
}

export const deleteFilmGenre = (film_id, id) => async(dispatch, reducers) => {
  await addRemoveGenreAsync(film_id, id);
  setSuccessMess("Delete complete")(dispatch, reducers);
  getFilm(film_id)(dispatch, reducers);
}