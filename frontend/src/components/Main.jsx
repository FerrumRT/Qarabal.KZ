import React, { useEffect } from 'react';
import Films from './Main/Films';
import MyNavbar from './Template/Navbar';

export default function Main(){

  useEffect(()=>{
    document.title="QarabAl.KZ";
  },[])

  return (
    <>
    <MyNavbar/>
    <div className="container" style={{minHeight: "500px", paddingTop: "3em", paddingBottom: "3em"}}>
      <div className="row">
        <div className="col-3">
          Filter
        </div>
        <div className="col-9">
          <Films/>
        </div>
      </div>
    </div>
    </>
  )
}