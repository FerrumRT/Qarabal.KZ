import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGenre, getGenres } from "../../../actions/genreAction";

export default function AddGenreModal(){

  useEffect(()=>{
    if(!reducers.genre.list.length) getGenres()(dispatch, reducers);
  }, [])

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [nameErrMess, setNameErrMess] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    switch(event.target.name){
      case "name": setName(event.target.value); setNameErrMess(""); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorless = true;
    if(name === ""){ setNameErrMess("Genre Name requred"); errorless = false}
    if (errorless) addGenre({name})(dispatch, reducers);
  }

  return (<>
    <Button size="sm" className="float-right" variant="light" onClick={handleShow}>
      Add Genre
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adding Genre</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {reducers.successMes!==""?<p style={{color: "green"}}>{reducers.successMes}</p>:""}
          {nameErrMess!==""?<small style={{"color":"red"}}>{nameErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="name">Genre Name </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="name"
            name="name" 
            value={name}
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