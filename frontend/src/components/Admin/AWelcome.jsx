import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ANavbar from './ANavbar';

export default function AdminWelcome(){

  const history = useHistory();

  useEffect(()=>{
    document.title="Admin - Qarabal";
    history.push("/admin/films");
  },[])

  return (
    <>
    </>
  )
}