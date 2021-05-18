import { useEffect, useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { changeFilm, deleteFilm, filmPhoto, getFilm } from "../../../actions/filmActions"
import ANavbar from "../ANavbar"
import SideBar from "../ASideBar"
import AddFilmGenres from "./AAddFilmGenres"
import AddFilmSource from "./AAddFilmSourceForm"
import PhotoModal from "./APhotoModal"

export default function FilmDetails(){

  const id = useParams();

  const history = useHistory();

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    getFilm(id.id)(dispatch, reducers);
  },[]);

  useEffect(()=>{
    if (reducers.film.details.title !== undefined){
      setTitle(reducers.film.details.title);
      setAuthor(reducers.film.details.author.id);
      setDescription(reducers.film.details.description);
      setType(reducers.film.details.type);
      setReleaseDate(reducers.film.details.release_date);
      setPhoto(reducers.film.details.photo_url);
    }
  }, [reducers.film.details]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [photo, setPhoto] = useState("");

  const handleChange = (event) => {
    switch(event.target.name){
      case "title": setTitle(event.target.value); break;
      case "author": setAuthor(event.target.value); break;
      case "description": setDescription(event.target.value); break;
      case "type": setType(event.target.value); break;
      case "releaseDate": setReleaseDate(event.target.value); break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    changeFilm({
      id:id.id,
      title,
      author,
      description,
      type,
      releaseDate
    })(dispatch, reducers);
  }

  const addPhoto = (event) => {
    filmPhoto(id.id, event.target.files[0])(dispatch, reducers);
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
              <h3 className="float-left">Film: {reducers.film.details.title}</h3>
              <Form onSubmit={handleSubmit}>
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
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <PhotoModal/>
                  </InputGroup.Prepend>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="photo"
                      aria-describedby="photo"
                      name="photo"
                      onChange={addPhoto}
                    />
                    <label className="custom-file-label" htmlFor="photo">
                      {photo?photo:"Choose file"}
                    </label>
                  </div>
                </InputGroup>
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
                    <option value="" selected disabled>==Select==</option>
                    {reducers.author.list.map(au=>{
                      return(
                        <option key={au.id} value={au.id} selected={author===au.fullName}>{au.fullName}</option>
                      )
                    })}
                  </Form.Control>
                </InputGroup>
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
                    <option value="" selected disabled>==Select==</option>
                    <option value="Film">Film</option>
                    <option value="Multy-Series">Multy-Series</option>
                  </Form.Control>
                </InputGroup>
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
                <Button variant="light" type="submit">
                  Save
                </Button>
                <Button className="float-right" variant="danger" onClick={()=>{deleteFilm({id:id.id})(dispatch, reducers); history.push("/admin/films");}} type="button">
                  Delete
                </Button>
              </Form>
              <h3 className="mt-3">Film Sources</h3>
              <AddFilmSource/>
              <h3 className="mt-3">Film Genres</h3>
              <AddFilmGenres/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}