import React, {useEffect, useState} from 'react';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import Cookies from 'js-cookie'
import { userIdAtom, jwtAtom, adminAtom, cookieAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";
import { useLocation, useNavigate } from 'react-router-dom';


const Sign_in = () => {
  const location = useLocation();
 
  const [email, setEmail] = useState(location.state !== null? location.state.email : "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const [jwt,setJwt] = useAtom(jwtAtom);
  const setAdmin = useSetAtom(adminAtom);
  const cookiechoice = useAtomValue(cookieAtom);


  useEffect(
    () =>{
      if(jwt != ""){
        navigate('/');
      }
    },[]
  )

  const submitData = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      "user": {
        "email": email,
        "password": password
      }
    };
    fetch(API_URL + '/users', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        setJwt([...response.headers.get('authorization')].join(''));
        Cookies.set('token', [...response.headers.get('authorization')].join(''));
        return response.json()
        })
      .then((response) => {
          setUserId(response.id);          
          setAdmin(response.user.admin.toString());
          if(cookiechoice){
            Cookies.set('id', response.id);
            Cookies.set('admin', response.user.admin.toString());
          }
          
          navigate('/');
      })
    
  }
 

  return (
    <>
      {email !== ""? <h2>PLus qu'une toute petite étape pour finaliser votre inscription!</h2> : null}
      <form onSubmit={submitData}>
        <label htmlFor='email'> Email </label>
          <input 
            type="email"
            required
            value={email}
            pattern='[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}' 
            id='email'
            onChange={(e) => setEmail(e.target.value)} 
          />

        <label htmlFor='password'> Mot de passe </label>
          <input 
            type="password" 
            id='password'
            required
            onChange={(e) => setPassword(e.target.value)} 
          />

        <label htmlFor='passwordConfirmation'> Confirmez le mot de passe </label>
          <input 
            type="password" 
            id='passwordConfirmation'
            required
            pattern={password}
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
          />
        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
      {isLoading? <i className="fas fa-circle-notch fa-spin"></i>:null}
      <br />
      {cookiechoice? null : <p>En acceptant les cookies avant votre connexion nous pourrons maintenir votre connexion même si vous fermez la page web</p> }
    </>
  );
};

export default Sign_in;