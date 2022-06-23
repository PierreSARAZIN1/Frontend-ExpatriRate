import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import style from './style.css';
import { useAtom } from 'jotai';
import { userIdAtom, jwtAtom } from '../../stores/user';
import { API_URL } from "../../stores/api_url";
import Cookies from 'js-cookie';

const Navbar = () => {
  
  
  const [jwt, setJwt] = useAtom(jwtAtom);
  const [id, setId] = useAtom(userIdAtom);
  const navigate = useNavigate()

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
   
  return (
    <nav>
      <img src={logo} alt="" />
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
  {id == ""?
    <>
      <li>
        <Link to="/sign_in">S'inscrire</Link>
      </li>
      <li>
        <Link to="/login">Se connecter</Link>
      </li>
    </>
  :
    <>
     <li>
        <Link to={"/profil/" + id}>Profil</Link>
      </li>
      <li onClick={logout}>
        Deconnexion
      </li>
    </>
  }
        
      </ul>
    </nav>
  );
};

export default Navbar;