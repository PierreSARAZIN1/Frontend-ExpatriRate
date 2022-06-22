import React from 'react';
import Navbar from 'components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Sign_in from 'pages/Sign_in';

const App = () => {

  console.log(useLocation().pathname);

  return (
    <>
    {useLocation().pathname !="/"? <Navbar/>:null}
      
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign_in" element={<Sign_in/>}/>
      </Routes>
    </>
  );
};

export default App;