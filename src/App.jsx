import React from 'react';
import Navbar from 'components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Sign_in from 'pages/Sign_in';
import Profile from 'pages/Profile';

const App = () => {

  return (
    <>
    <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign_in" element={<Sign_in/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </>
  );
};

export default App;