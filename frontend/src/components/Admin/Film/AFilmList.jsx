import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilms } from '../../../actions/filmActions';
import AddFilmModal from './AAddFilmModal';
import ANavbar from '../ANavbar';
import SideBar from '../ASideBar';

export default function FilmList(){

  const nonActive = {
    "backgroundColor": `rgba(0, 0, 0, 0.8)`,
    "border": '0px',
    "color": "#fff"
  }

  const active = {
    "backgroundColor": `rgba(255, 255, 255, 0.8)`,
    "border": '0px',
    "color": "#000"
  }

  var _ = require('lodash');
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");

  useEffect(()=>{
    _.delay(()=>{
      getFilms(search)(dispatch, reducers);
    }, 300);
  }, [searched]);
  
  const makeSearch = (event) => {
    setSearch(event.target.value);
    _.delay(()=>{
      setSearched(search);
    });
  }

  const pageCount = () => {
    let c;
    c = Math.floor(reducers.film.list.length / 5);
    if(reducers.film.list.length % 5 != 0) c++;
    return c;
  }

  const [page, setPage] = useState(1);
  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  return (<>
    <ANavbar/>
    <div className="container" style={{minHeight: "500px", paddingTop: "3em", paddingBottom: "3em"}}>
    <div style={{"backgroundColor":"rgba(0, 0, 0, 0.5)"}} className="p-4">
        <div className="row">
          <SideBar/>
          <div className="col-8">
            {reducers.successMes!==""?<p style={{color: "green"}}>{reducers.successMes}</p>:""}
            <h3 className="float-left">Films</h3>
            <AddFilmModal/>
            <Form.Control value={search} onChange={makeSearch} placeholder="Search by title"></Form.Control>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Release Date</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {reducers.film.list.slice((page-1)*5, page*5).map(film=>{
                  return(
                    <tr key={film.id}>
                      <th scope="row">{film.id}</th>
                      <th>{film.title}</th>
                      <th>{film.author.fullName}</th>
                      <th>{film.release_date}</th>
                      <th><Link to={`/admin/film/${film.id}`} className="btn btn-light">Details</Link></th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {pageCount()===1||pageCount()===0?"":
            <ul class="pagination mt-3">
              <li class="page-item">
                <a class="page-link" onClick={()=>setPage(1)} aria-label="Previous" style={{"backgroundColor": `rgba(0, 0, 0, 0.8)`, "border": '0px', "color": "#fff"}}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {[...Array(Math.floor(pageCount())).keys()].map((id)=>{
                return(<li key={id} class="page-item active"><a class="page-link" onClick={event=>setPage(id + 1)} style={page===id+1?active:nonActive}>{id + 1}</a></li>);
              })}
              <li class="page-item">
                <a class="page-link" onClick={()=>setPage(pageCount())} aria-label="Next" style={{"backgroundColor": `rgba(0, 0, 0, 0.8)`, "border": '0px', "color": "#fff"}}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>}
          </div>
        </div>
      </div>
    </div>
  </>)
}