import React from 'react';
import Navbar from 'components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Sign_in from 'pages/Sign_in';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign_in" element={<Sign_in/>}/>
      </Routes>
    </>
  );
};

export default App;