import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Nav, Navbar, Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Dropdown from 'react-multilevel-dropdown';
import { logout } from '../../actions/userAction';
import { getGenres } from '../../actions/genreAction';

export default function MyNavbar(){
  
  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);

  useEffect(()=>{
    getGenres()(dispatch, reducers);
  }, []);

  const make_logout = () => {
    logout()(dispatch, reducers);
  }

  return(
    <>
    <Navbar className="navbar-dark" expand="lg" style={{backgroundColor: `rgba(255,186,121,0.6)`}}>
      <Container>
        <Link className="navbar-brand" to="/">QarapAl.KZ</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="main_nav">
          <Nav>
            <li className="nav-item dropdown">
              <Dropdown position="right" style={{border:"0px", backgroundColor:`rgba(0,0,0,0)`}} className="nav-link" title={`Genres`}>
                {reducers.genre.list?reducers.genre.list.map((genre)=>{
                  return(<Link className="dropdown-item" key={genre.id} to={`/genre/${genre.id}`}>{genre.genre}</Link>)
                }):""}
              </Dropdown>
            </li>
            <Nav.Link href="#">Popular Films</Nav.Link>
          </Nav>
          <Form inline className="mr-auto">
            <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <Button variant="outline-light" className="my-2 my-sm-0">Search</Button>
          </Form>
          <Nav>
            {!reducers.user.is_authorized?<>
              <Link className="nav-link" to="/register">Register</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </>:<>
              {reducers.user.is_admin ||reducers.user.is_moderator?
              <Link className="nav-link" to="/admin/films">Admin</Link>:""}
              <Nav.Link>{reducers.user.details.fullName}</Nav.Link>
              <Nav.Link onClick={make_logout}>Logout</Nav.Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}