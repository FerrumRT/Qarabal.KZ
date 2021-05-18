import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGenre, getGenres } from "../../../actions/genreAction";
import { addUser, getUsers } from "../../../actions/userAction";

export default function AddUserModal(){

  useEffect(()=>{
    if(!reducers.user.list.length) getUsers()(dispatch, reducers);
  }, [])

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameErrMess, setFullNameErrMess] = useState("");
  const [emailErrMess, setEmailErrMess] = useState("");
  const [passwordErrMess, setPasswordErrMess] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    switch(event.target.name){
      case "fullName": setFullName(event.target.value); setFullNameErrMess(""); break;
      case "email": setEmail(event.target.value); setEmailErrMess(""); break;
      case "password": setPassword(event.target.value); setPasswordErrMess(""); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorless = true;
    if(fullName === ""){ setFullNameErrMess("Full Name requred"); errorless = false}
    if(email === ""){ setEmailErrMess("Email requred"); errorless = false}
    if(password === ""){ setPasswordErrMess("Password requred"); errorless = false}
    if (errorless) addUser({fullName, email, password})(dispatch, reducers);
  }

  return (<>
    <Button size="sm" className="float-right" variant="light" onClick={handleShow}>
      Add User
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adding User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {reducers.successMes!==""?<p style={{color: "green"}}>{reducers.successMes}</p>:""}
          {reducers.errMes!==""?<p style={{color: "red"}}>{reducers.errMes}</p>:""}
          {fullNameErrMess!==""?<small style={{"color":"red"}}>{fullNameErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="fullName">Full Name </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="fullName"
            name="fullName" 
            value={fullName}
            onChange={handleChange}/>
          </InputGroup>
          {emailErrMess!==""?<small style={{"color":"red"}}>{emailErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="email">Email </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="email"
            name="email" 
            value={email}
            onChange={handleChange}/>
          </InputGroup>
          {passwordErrMess!==""?<small style={{"color":"red"}}>{passwordErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="password">Password </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="password"
            name="password" 
            value={password}
            type="password"
            onChange={handleChange}/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
        </Form>
    </Modal>
  </>)
}