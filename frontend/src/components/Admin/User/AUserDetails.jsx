import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { changeUser, deleteUser, getUser } from "../../../actions/userAction";
import ANavbar from "../ANavbar";
import SideBar from "../ASideBar";
import RoleUser from "./ARoleUser";

export default function UserDetails() {
  
  const id = useParams();

  const history = useHistory();

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    getUser(id.id)(dispatch, reducers);
  },[]);

  useEffect(()=>{
    if(!reducers.user.is_admin)history.push("/admin/films");
    if (reducers.user.one.email !== undefined){
      setEmail(reducers.user.one.email);
      setFullName(reducers.user.one.fullName);
    }
  }, [reducers.user.one]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    switch(event.target.name){
      case "fullName": setFullName(event.target.value); break;
      case "email": setEmail(event.target.value); break;
      case "password": setPassword(event.target.value); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    changeUser({
      "id": id.id,
      fullName,
      email,
      password
    })(dispatch, reducers);
    setPassword("");
  }

  return (
    <>
      <ANavbar/>
      <div className="container" style={{minHeight: "500px", paddingTop: "3em", paddingBottom: "3em"}}>
        <div style={{"backgroundColor":"rgba(0, 0, 0, 0.5)"}} className="p-4">
          <div className="row">
            <SideBar/>
            <div className="col-8">
              {reducers.successMes!==""?<p style={{color: "green"}}>{reducers.successMes}</p>:""}
              <h3 className="float-left">User: {fullName}</h3>
              <Form onSubmit={handleSubmit}>
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
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="email">Email </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control 
                  aria-describedby="email"
                  name="email" 
                  value={email}
                  disabled
                  onChange={handleChange}/>
                </InputGroup>
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
                <Button variant="light" type="submit">
                  Save
                </Button>
                <Button className="float-right" variant="danger" onClick={()=>{deleteUser(email)(dispatch, reducers); history.push("/admin/users");}} type="button">
                  Delete
                </Button>
              </Form>
              <RoleUser/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}