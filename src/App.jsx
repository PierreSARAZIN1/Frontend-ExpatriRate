import React from 'react';
import Navbar from 'components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Sign_up from 'pages/Sign_up';
import Profile from 'pages/Profile';
import City from "./pages/City";
import Dashboard from 'pages/Admin/Dashboard';
import CreateCity from 'pages/Admin/CreateCity';
import UpdateCity from 'pages/Admin/UpdateCity';
import Cookie from 'components/Cookie';
import Footer from 'components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {

  const location = useLocation().pathname;

  return (
    <>
      <Navbar/>
      <Cookie/>

      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign_up" element={<Sign_up/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/city/:id" element={<City/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/create_city" element={<CreateCity/>}/>
        <Route path="/admin/update_city/:id" element={<UpdateCity/>}/>
        <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
      </Routes>

      {location == "/login" || location == "/sign_up"? null:<Footer/>}
      


    </>
  );
};

export default App;