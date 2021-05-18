import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../../actions/filmActions";

export default function Films() {

  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);

  const [search, setSearch] = useState("");

  useEffect(()=>{
    getFilms(search)(dispatch, reducers);
  },[search])

  return (
    <>
      <div className="row">
        <div className="col-12 mt-3">
          <input type="text" placeholder="Instant Search" className="form-control" value={search} onChange={(event)=>{setSearch(event.target.value)}}/>
        </div>
        {reducers.film.list.length?reducers.film.list.map((film)=>{
          return(
            <div className="col-4 mt-3">
              <Card className="p-1" style={{"background-color": `rgba(0, 0, 0, 0.8)`}}>
                {film.photo_url && <Card.Img variant="top" className="image-small" src={`/static/${film.photo_url}`}/>}
                <Card.Body>
                  <Card.Title>{film.title}</Card.Title>
                  <Card.Text>{film?film.description?film.description.substr(0,100)+"...":"":""}
                  </Card.Text>
                  <Button variant="light" size="sm">See More</Button>
                </Card.Body>
              </Card>
            </div>
          )
        }):<h2 className="mx-auto mt-3" style={{"color":`rgb(173,3,5)`}} >There nothing</h2>}
      </div>
    </>
  );
}