import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Footer from './components/Template/Footer';
import Main from './components/Main';
import Register from './components/Register';
import AdminWelcome from './components/Admin/AWelcome';
import FilmList from './components/Admin/Film/AFilmList';
import { getCurrentUser } from './actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthorList from './components/Admin/Author/AAuthorList';
import FilmDetails from './components/Admin/Film/AFilmDetails';
import AuthorDetails from './components/Admin/Author/AAuthorDetails';
import GenreDetails from './components/Admin/Genre/AGenreDetails';
import GenreList from './components/Admin/Genre/AGenreList';
import UserDetails from './components/Admin/User/AUserDetails';
import UserList from './components/Admin/User/AUserList';
import "./style/style.css";

function App() {
  
  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);
  
  useEffect(()=>{
    getCurrentUser()(dispatch, reducers);
  }, []);

  return (
    <>
    <Router>
      <Switch>
        <Route path="/admin/user/:id">
          <UserDetails/>
        </Route>
        <Route path="/admin/users">
          <UserList/>
        </Route>
        <Route path="/admin/genre/:id">
          <GenreDetails/>
        </Route>
        <Route path="/admin/genres">
          <GenreList/>
        </Route>
        <Route path="/admin/author/:id">
          <AuthorDetails/>
        </Route>
        <Route path="/admin/authors">
          <AuthorList/>
        </Route>
        <Route path="/admin/film/:id">
          <FilmDetails/>
        </Route>
        <Route path="/admin/films">
          <FilmList/>
        </Route>
        <Route path="/admin">
          <AdminWelcome/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
