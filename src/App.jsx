import React, {useEffect, useRef, useState} from 'react';
import Navbar from 'components/Navbar';
import {Routes, Route, useLocation} from 'react-router-dom';
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
import NewPassword from 'pages/NewPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PageNotFound from "./components/PageNotFound";
import LoadScreen from 'components/LoadScreen';

const App = () => {

    const location = useLocation().pathname;

    return (
        <>


            <section className='loadingmain'>
                <div className='loadingviewcontent'>
                    <img className='loadingscreen'
                         src="https://cliply.co/wp-content/uploads/2021/02/392102850_EARTH_EMOJI_400px.gif"
                         alt="planet earth turning on itself"/>
                    <h1>Expatrirate</h1>

                </div>
            </section>


            <section className='appmain'>
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
                    <Route path="/new-password/reset_token=:token" element={<NewPassword/>}/>
                    <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>

                {location == "/login" || location == "/sign_up" || location.includes("admin") ? null : <Footer/>}


            </section>
        </>
    );
};

export default App;