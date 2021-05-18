import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeErrMess } from '../actions/supActions';
import { login } from '../actions/userAction';
import MyNavbar from './Template/Navbar';

export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const reducers = useSelector(state=>state);

  const history = useHistory();

  const handleChange = (event) => {
    if (reducers.errMes!=="") removeErrMess()(dispatch, reducers)
    switch(event.target.name){
      case "email" :setEmail(event.target.value); break;
      case "password" :setPassword(event.target.value); break;
      default: break;
    }
  }
  
  if(reducers.user.is_authorized) history.push("/")

  useEffect(()=>{
    document.title="Login";
  },[])

  useEffect(()=>{
    if(reducers.errMes === "Wrong email or password") setPassword("");
  }, [reducers]);

  const makeLogin = event =>{
    event.preventDefault();
    login(email, password)(dispatch, reducers);
  }

  return(
  <>
    <MyNavbar/>
    <div className="container" style={{minHeight: "500px", paddingTop: "3em", paddingBottom: "3em"}}>
      <div style={{backgroundColor: `rgba(0, 0, 0, 0.5)`}} className="py-4">
        <h3 className="text-center">Login</h3>
        <div className="row justify-content-center">
          {reducers.errMes!==""?<p className="col-7" style={{color: "red"}}>{reducers.errMes}</p>:""}
          {reducers.successMes!==""?<p className="col-7" style={{color: "green"}}>{reducers.successMes}</p>:""}
          <form className="col-7" onSubmit={makeLogin} >
            <div className="form-group">
              <label>Email address</label>
              <input disabled={reducers.loading} type="email" value={email} name="email" onChange={handleChange} required className="form-control" autoFocus/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input disabled={reducers.loading} type="password" value={password} name="password" onChange={handleChange} required className="form-control"/>
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