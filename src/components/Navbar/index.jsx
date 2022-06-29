import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import style from './style.css';
import { useAtom } from 'jotai';
import { userIdAtom, jwtAtom, adminAtom } from '../../stores/user';
import { API_URL } from "../../stores/api_url";
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  
  
  const [jwt, setJwt] = useAtom(jwtAtom);
  const [id, setId] = useAtom(userIdAtom);
  const [admin, setAdmin] = useAtom(adminAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const[show, setShow] = useState(false);
  const[cityarray, setCityarray] = useState([]);


  useEffect(
    ()=>{
      fetch(API_URL + '/cities', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
          setCityarray(response.sort((a,b) => parseFloat(b.city.overall) - parseFloat(a.city.overall)))
        })

    }
  )

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
      setAdmin("false");
      if(Cookies.get('id') != undefined){
        Cookies.remove('id')
        Cookies.remove('token')
        Cookies.remove('admin')
      }
     
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
         <i className="fa-solid fa-angle-down"></i>
      </div> 
      {show? 
      <>
      <div className='modalquit' onClick={shownavabar}></div>
        <ul className={location.pathname == '/'? 'absolute' : '' }>
          <li onClick={shownavabar}>
            <Link to="/">🗺️ &nbsp;Home</Link>
          </li>
    {id == ""?
      <>
        <li onClick={shownavabar}>
          <Link to="/sign_up">🎒 &nbsp;Sign up</Link>
        </li>
        <li onClick={shownavabar}>
          <Link to="/login">✈️ &nbsp;Sign in</Link>
        </li>
      </>
    :
      <>
      <li onClick={shownavabar}>
          <Link to={"/profile/" + id}>📒 Profile</Link>
        </li>
        <li onClick={logout} className="Logout" >❤️‍🩹 &nbsp;Logout</li>
      </>
    }

        <p>Top 3 Cities to Expatriate</p>
        {cityarray.slice(0,3).map((city,index) => {
          return(
            <li onClick={shownavabar}>
              <Link to={"/city/" + city.city.id}>{index === 0?"🏅": index === 1 ?"🥈":"🥉"} &nbsp;{city.city.name}</Link>
            </li>
          )
        })}

    {admin == "true"? 
    <>
      <p>Dashboard administrateur</p>
      <li onClick={shownavabar}>
        <Link to="/admin/create_city">🤴 &nbsp; Créer une ville</Link>
      </li>
      <li onClick={shownavabar}>
        <Link to="/admin/dashboard">🧙‍♂️ &nbsp; Dashboard</Link>
      </li>
    </>
      
    : null}
          
        </ul>
      </>
    :
    null
    }
    </nav>
  );
};

export default Navbar;