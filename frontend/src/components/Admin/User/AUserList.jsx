import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddGenreModal from './AAddUserModal';
import ANavbar from '../ANavbar';
import SideBar from '../ASideBar';
import { Link, useHistory } from 'react-router-dom';
import { getGenres } from '../../../actions/genreAction';
import { getUsers } from '../../../actions/userAction';

export default function UserList(){

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

  const history = useHistory();

  var _ = require('lodash');

  useEffect(()=>{
    if(!reducers.user.is_admin)history.push("/admin/films");
    getUsers()(dispatch, reducers);
  }, []);

  const pageCount = () => {
    let c;
    c = Math.floor(reducers.user.list.length / 5);
    if(reducers.user.list.length % 5 != 0) c++;
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
            <h3 className="float-left">Users</h3>
            <AddGenreModal/>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {reducers.user.list.slice((page-1)*5, page*5).map(user=>{
                  return(
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <th>{user.fullName}</th>
                      <th>{user.email}</th>
                      <th>{user.roles.map((role)=>{return(role.role+" ")})}</th>
                      <th><Link to={`/admin/user/${user.id}`} className="btn btn-light">Details</Link></th>
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
              {[...Array(pageCount()).keys()].map((id)=>{
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