import React, { useRef } from "react";
import './style.css';
import Cookies from "js-cookie";
import { cookieAtom } from "stores/user";
import { useSetAtom } from "jotai";
import { Link } from 'react-router-dom';

const Cookie = () => {

  const cookiepopup = useRef(null);
  const setCookieChoice = useSetAtom(cookieAtom);


  const acceptcookie = () =>{
    cookiepopup.current.classList.add("translateout");
    setCookieChoice(true);
  }

  const refusecookie = () =>{
    cookiepopup.current.classList.add("translateout")
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('admin');
  }


  return(
    <div className="cookie" ref={cookiepopup}>
      <div className="cookiecontent">
        <p> This site uses cookies that allow us to provide you with an optimal browsing experience, such as maintaining your connection when you close the web page. Please refer to your <Link to="/privacy_policy">Privacy Policy</Link> for more information.</p>
        <div className="cookiechoice">
          <button className="btn btn-primary" onClick={() => acceptcookie()}>Allow</button>
          <button className="btn btn-primary" onClick={() => refusecookie()}>Decline</button>
        </div>
      </div>
    </div>
  )
}

export default Cookie;