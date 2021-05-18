import { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addFilmGenre, deleteFilmGenre } from "../../../actions/filmActions";
import { getGenres } from "../../../actions/genreAction";

export default function AddFilmGenres() {

  const id = useParams();

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    getGenres()(dispatch, reducers);
  }, [])

  const [genre, setGenre] = useState("");
  const [genreErrMess, setGenreErrMess] = useState("");

  const [myArr, setMyArr] = useState(() => {
    return [];
  });

  useEffect(()=>{
    setGenre("");
    setMyArr(() => {
      let arr = [];
      if (reducers.genre !== undefined)
      reducers.genre.list.forEach(el => {
        let contains = false;
        if (reducers.film.details.genres !== undefined)
          reducers.film.details.genres.forEach(el2 => {
            if(el.genre == el2.genre) {contains = true;}
          })
        if (!contains) arr.push(el);
      });
      return arr;
    });
  }, [reducers.genre, reducers.film])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (genre === "") setGenreErrMess("Field requred");
    else {
      console.log(genre);
      addFilmGenre(id.id, genre)(dispatch, reducers);
    }
  }

  return (<>
    {reducers.film.details.genres?reducers.film.details.genres.map((genre)=>{
      return(<><Badge key={genre.id} pill variant="light">
      {genre.genre} <span onClick={()=>{deleteFilmGenre(id.id, genre.id)(dispatch, reducers)}}>X</span>
    </Badge>{' '}</>);
    }):""}
    {genreErrMess?<p style={{"color":"red"}}>{genreErrMess}</p>:""}
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="10">
          <Form.Control
                  value={genre}
                  onChange={(event)=>{setGenre(event.target.value); setGenreErrMess("");}}
                  defaultValue="" as="select">
            <option value="" disabled>==Select==</option>
            {myArr.map((genre)=>{
              if (reducers.film.details.genres && !reducers.film.details.genres.includes(genre))
              {
                return(<option value={genre.id} key={genre.id}>{genre.genre}</option>)
              }
            })}
          </Form.Control>
        </Col>
        <Col md="2">
          <Button type="submit" variant="light">Save</Button>
        </Col>
      </Row>
    </Form>
  </>)
}