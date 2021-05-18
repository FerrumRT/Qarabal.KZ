import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeErrMess } from '../actions/supActions';
import { register } from '../actions/userAction';
import MyNavbar from './Template/Navbar';

export default function Login(){

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);

  const history = useHistory();

  const handleChange = (event) => {
    if (reducers.errMes!=="") removeErrMess()(dispatch, reducers);
    switch(event.target.name){
      case "email" :setEmail(event.target.value); break;
      case "password" :setPassword(event.target.value); break;
      case "fullName" :setFullName(event.target.value); break;
      case "rePassword" :setRePassword(event.target.value); break;
      default: break;
    }
  }
  
  if(reducers.user.is_authorized) history.push("/")
  if (reducers.errMes === "Register complete") history.push("/login");

  useEffect(()=>{
    document.title="Register";
  },[])

  const makeRegister = event =>{
    event.preventDefault();
    register(fullName, email, password, rePassword)(dispatch, reducers);
  }

  return(
  <>
  <MyNavbar/>
  <div className="container" style={{minHeight: "500px", paddingTop: "3em", paddingBottom: "3em"}}>
    <div style={{backgroundColor: `rgba(0, 0, 0, 0.5)`}} className="pt-4 pb-4">
      <h3 className="text-center">Register</h3>
      <div className="row justify-content-center">
        {reducers.errMes!==""?<p className="col-7" style={{color: "red"}}>{reducers.errMes}</p>:""}
        <form className="col-7" onSubmit={makeRegister} >
          <div className="form-group">
            <label>Full Name</label>
            <input disabled={reducers.loading} type="text" value={fullName} name="fullName" onChange={handleChange} required className="form-control" autoFocus/>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input disabled={reducers.loading} type="email" value={email} name="email" onChange={handleChange} required className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input disabled={reducers.loading} type="password" value={password} name="password" onChange={handleChange} required className="form-control"/>
          </div>
          <div className="form-group">
            <label>Rewrite Password</label>
            <input disabled={reducers.loading} type="password" value={rePassword} name="rePassword" onChange={handleChange} required className="form-control"/>
          </div>
          <div className="form-group mt-4 text-right">
            <button disabled={reducers.loading} type="submit" className="btn btn-light">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </>
  )
}