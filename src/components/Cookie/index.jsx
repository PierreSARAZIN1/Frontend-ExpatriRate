import React, { useRef } from "react";
import './style.css';
import Cookies from "js-cookie";
import { cookieAtom } from "stores/user";
import { useSetAtom } from "jotai";

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
        <p> Ce site utilise des cookies qui nous permettent de vous proposer une navigation optimale. </p>
        <div className="cookiechoice">
          <button className="btn btn-primary" onClick={() => acceptcookie()}>Accepter</button>
          <button className="btn btn-primary" onClick={() => refusecookie()}>Refuser</button>
        </div>
      </div>
    </div>
  )
}

export default Cookie;