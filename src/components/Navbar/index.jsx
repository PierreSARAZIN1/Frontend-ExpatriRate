import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import style from './style.css';
import { useAtom } from 'jotai';
import { userIdAtom, jwtAtom } from '../../stores/user';
import { API_URL } from "../../stores/api_url";
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  
  
  const [jwt, setJwt] = useAtom(jwtAtom);
  const [id, setId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const[show, setShow] = useState(false);

  const logout = () =>{
    fetch(API_URL + '/users/sign_out', {
      method: 'delete',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setJwt('');
      setId('');
      Cookies.set('id', "")
      Cookies.set('token', "")
      navigate('/')
    })
  }

  const shownavabar = () => {
    setShow(!show);
  }
   
  return (
    <nav>
      <div className={location.pathname == '/'? 'logoflexabsolute' : 'logoflex' } onClick={shownavabar}>
         <img src="https://cliply.co/wp-content/uploads/2021/02/392102850_EARTH_EMOJI_400px.gif" alt="" />
         <i class="fa-solid fa-angle-down"></i>
      </div> 
      {show? 
      <>
      <div className='modalquit' onClick={shownavabar}></div>
        <ul className={location.pathname == '/'? 'absolute' : '' }>
          <li>
            <Link to="/">🗺️ &nbsp;Accueil</Link>
          </li>
    {id == ""?
      <>
        <li>
          <Link to="/sign_in">🎒 &nbsp;S'inscrire</Link>
        </li>
        <li>
          <Link to="/login">✈️ &nbsp;Se connecter</Link>
        </li>
      </>
    :
      <>
      <li>
          <Link to={"/profile/" + id}>📒 Profil</Link>
        </li>
        <li onClick={logout}>❤️‍🩹 &nbsp;Deconnexion</li>
      </>
    }

        <p>Top 3 des Pays pour s'expatrier</p>
        <li>
          <Link to="/city/1">🥖 &nbsp;Paris</Link>
        </li>
        <li>
          <Link to="/city/2">💂 &nbsp;Londres</Link>
        </li>
        <li>
          <Link to="/city/4">⛩ &nbsp;Seoul</Link>
        </li>
          
        </ul>
      </>
    :
    null
    }
    </nav>
  );
};

export default Navbar;