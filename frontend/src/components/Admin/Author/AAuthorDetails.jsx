import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { changeAuthor, deleteAuthor, getAuthor } from "../../../actions/authorActions";
import ANavbar from "../ANavbar";
import SideBar from "../ASideBar";

export default function AuthorDetails() {
  
  const id = useParams();

  const history = useHistory();

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    getAuthor(id.id)(dispatch, reducers);
  },[]);

  useEffect(()=>{
    if (reducers.author.details.fullName !== undefined){
      setName(reducers.author.details.fullName);
    }
  }, [reducers.author.details]);

  const [name, setName] = useState("");

  const handleChange = (event) => {
    switch(event.target.name){
      case "name": setName(event.target.value); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    changeAuthor({
      id:id.id,
      name
    })(dispatch, reducers);
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
              <h3 className="float-left">Author: {name}</h3>
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="name">Full Name </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control 
                  aria-describedby="name"
                  name="name" 
                  value={name}
                  onChange={handleChange}/>
                </InputGroup>
                <Button variant="light" type="submit">
                  Save
                </Button>
                <Button className="float-right" variant="danger" onClick={()=>{deleteAuthor({id:id.id})(dispatch, reducers); history.push("/admin/authors");}} type="button">
                  Delete
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}