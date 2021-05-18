import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../actions/userAction';

export default function ANavbar(){
  
  const history = useHistory();
  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);

  const make_logout = () => {
    logout()(dispatch, reducers);
  }

  useEffect(()=>{
    if (!(reducers.user.is_authorized||reducers.user.is_admin||reducers.user.is_moderator)) history.push("/");
  },[reducers.user])

  return(
    <>
    <Navbar className="navbar-dark" expand="lg" style={{backgroundColor: `rgba(100,100,100,0.8)`}}>
      <Container>
        <Link className="navbar-brand" to="/admin/films">QarapAl.KZ Admin</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="main_nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">Client part</Link>
          </Nav>
          <Nav>
            {!reducers.user.is_authorized?<>
              <Link className="nav-link" to="/register">Register</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </>:<>
              {reducers.user.is_admin || reducers.user.is_moderator?
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