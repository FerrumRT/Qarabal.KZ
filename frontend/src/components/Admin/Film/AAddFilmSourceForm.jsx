import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addFilmSource, deleteFilmSource } from "../../../actions/filmActions";

export default function AddFilmSource(){

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const id = useParams();

  const handleChange = (event) => {
    switch(event.target.name){
      case "name": setName(event.target.value); break;
      case "url": setUrl(event.target.value); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addFilmSource({
      name,
      url,
      "film_id": id.id
    })(dispatch, reducers);
    setName("");
    setUrl("");
  }

  return (<>
    {reducers.film.details.filmSources!==undefined?reducers.film.details.filmSources.map((source)=>{
      return(
        <Form onSubmit={handleSubmit} key={source.id}>
          <Row>
            <Col md="5">Source Name
              <Form.Control 
              aria-describedby="title"
              name="title"
              value={source.name}
              disabled
              onChange={handleChange}/>
            </Col>
            <Col md="5">Source Url
              <Form.Control 
              aria-describedby="title"
              name="title"
              disabled
              value={source.url}
              onChange={handleChange}/>
            </Col>
            <Col md="2">
              <Button variant="danger" className="mt-4" onClick={()=>{deleteFilmSource(source.id, id.id)(dispatch, reducers)}}>
                Delete
              </Button>
            </Col>
          </Row>
        </Form>
      )
    }):""}
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="5">Source Name
          <Form.Control
          aria-describedby="name"
          name="name" 
          value={name}
          required
          onChange={handleChange}/>
        </Col>
        <Col md="5">Source Url
          <Form.Control 
          aria-describedby="url"
          name="url" 
          value={url}
          required
          onChange={handleChange}/>
        </Col>
        <Col md="2">
          <Button variant="light" className="mt-4" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  </>)
}