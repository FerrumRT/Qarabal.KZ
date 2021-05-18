import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return(
    <>
      <footer style={{backgroundColor: `rgba(0, 0, 0, 0.5)`}}>
      <div className="container pt-5">
        <div className="row">
          <div className="col-6">
            <h3>QarapAl.KZ</h3>
            <Link to="/" style={{"color": "#fff"}}>Questions</Link>
          </div>
          <div className="col-3 o">
            <h3>Contacts</h3>
            <p>Email: timka211001@gmail.com <br/>
            Phone: 8(700)654-02-45</p>
          </div>
          <div className="col-3 o">
            <h3>Find me here</h3>
            <p>Mars pl., Sakura city, <br/>Mombek Bolat st., 600 h. 152 fl.</p>
          </div>
        </div>
        <p className="text-center m-0">(C)QarapAl.KZ All rights are reserved</p>
      </div>
    </footer>
    </>
  )
}