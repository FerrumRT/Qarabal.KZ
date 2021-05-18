import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuthors } from "../../../actions/authorActions";
import { addFilm } from "../../../actions/filmActions";

export default function AddFilmModal(){

  useEffect(()=>{
    if(!reducers.author.list.length) getAuthors()(dispatch, reducers);
  }, [])

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(reducers.author.list[0] !== undefined?reducers.author.list[0].fullName:"");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [photo, setPhoto] = useState();
  const [releaseDate, setReleaseDate] = useState("");
  const [titleErrMess, setTitleErrMess] = useState("");
  const [authorErrMess, setAuthorErrMess] = useState("");
  const [descriptionErrMess, setDescriptionErrMess] = useState("");
  const [typeErrMess, setTypeErrMess] = useState("");
  const [releaseDateErrMess, setReleaseDateErrMess] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    switch(event.target.name){
      case "title": setTitle(event.target.value); setTitleErrMess(""); break;
      case "author": setAuthor(event.target.value); setAuthorErrMess(""); break;
      case "description": setDescription(event.target.value); setDescriptionErrMess(""); break;
      case "type": setType(event.target.value); setTypeErrMess(""); break;
      case "releaseDate": setReleaseDate(event.target.value); setReleaseDateErrMess(""); break;
      case "photo": setPhoto(event.target.files[0]); console.log(photo); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorless = true;
    if(title === ""){ setTitleErrMess("Title requred"); errorless = false}
    if(author === ""){ setAuthorErrMess("Author requred"); errorless = false}
    if(description === ""){ setDescriptionErrMess("Description requred"); errorless = false}
    if(type === ""){ setTypeErrMess("Type requred"); errorless = false}
    if(releaseDate === ""){ setReleaseDateErrMess("Release Date requred"); errorless = false}
    console.log(photo);
    if (errorless) addFilm({
      title,
      author,
      description,
      type,
      releaseDate,
      photo
    })(dispatch, reducers);
  }

  return (<>
    <Button size="sm" className="float-right" variant="light" onClick={handleShow}>
      Add Film
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adding Film</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {reducers.successMes!==""?<p style={{color: "green"}}>{reducers.successMes}</p>:""}
          {titleErrMess!==""?<small style={{"color":"red"}}>{titleErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">Film Title </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="title"
            name="title" 
            value={title}
            onChange={handleChange}/>
          </InputGroup>
          {descriptionErrMess!==""?<small style={{"color":"red"}}>{descriptionErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="description">Film Description </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
            aria-describedby="description"
            name="description" 
            value={description}
            as="textarea"
            onChange={handleChange}/>
          </InputGroup>
          {authorErrMess!==""?<small style={{"color":"red"}}>{authorErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="author">Film Author </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
            as="select"
            aria-describedby="author"
            name="author"
            value={author}
            onChange={handleChange}>
              <option value="" selected>==Select==</option>
              {reducers.author.list.map(au=>{
                return(
                  <option key={au.id} value={au.id} selected={author===au.fullName}>{au.fullName}</option>
                )
              })}
            </Form.Control>
          </InputGroup>
          {typeErrMess!==""?<small style={{"color":"red"}}>{typeErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="type">Film Type </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
            as="select"
            aria-describedby="type"
            name="type" 
            value={type}
            onChange={handleChange}>
              <option value="" selected>==Select==</option>
              <option value="Film">Film</option>
              <option value="Multy-Series">Multy-Series</option>
            </Form.Control>
          </InputGroup>
          {releaseDateErrMess!==""?<small style={{"color":"red"}}>{releaseDateErrMess}</small>:""}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="releaseDate">Release Date </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
            aria-describedby="releaseDate"
            name="releaseDate"
            type="date"
            value={releaseDate}
            onChange={handleChange}/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="releaseDate">Photo</InputGroup.Text>
            </InputGroup.Prepend>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="photo"
                  aria-describedby="photo"
                  name="photo"
                  onChange={handleChange}
                />
                <label className="custom-file-label" htmlFor="photo">
                  {photo?photo.name?photo.name:"Choose file":"Choose file"}
                </label>
              </div>
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