import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../../actions/authorActions';
import AddAuthorModal from './AAddAuthorModal';
import ANavbar from '../ANavbar';
import SideBar from '../ASideBar';
import { Link } from 'react-router-dom';

export default function AuthorList(){

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

  useEffect(()=>{
    getAuthors()(dispatch, reducers);
  }, []);

  const pageCount = () => {
    let c;
    c = Math.floor(reducers.author.list.length / 5);
    if(reducers.author.list.length % 5 != 0) c++;
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
            <h3 className="float-left">Authors</h3>
            <AddAuthorModal/>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {reducers.author.list.slice((page-1)*5, page*5).map(author=>{
                  return(
                    <tr key={author.id}>
                      <th scope="row">{author.id}</th>
                      <th>{author.fullName}</th>
                      <th><Link to={`/admin/author/${author.id}`} className="btn btn-light">Details</Link></th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {pageCount()===1||pageCount()===0?"":
            <ul className="pagination mt-3">
              <li className="page-item">
                <a className="page-link" onClick={()=>setPage(1)} aria-label="Previous" style={{"backgroundColor": `rgba(0, 0, 0, 0.8)`, "border": '0px', "color": "#fff"}}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {[...Array(pageCount()).keys()].map((id)=>{
                return(<li key={id} className="page-item active"><a className="page-link" onClick={event=>setPage(id + 1)} style={page===id+1?active:nonActive}>{id + 1}</a></li>);
              })}
              <li className="page-item">
                <a className="page-link" onClick={()=>setPage(pageCount())} aria-label="Next" style={{"backgroundColor": `rgba(0, 0, 0, 0.8)`, "border": '0px', "color": "#fff"}}>
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