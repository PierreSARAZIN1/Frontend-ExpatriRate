import React, {useEffect, useState} from 'react';
import { useSetAtom, useAtom } from 'jotai';
import Cookies from 'js-cookie'
import { userIdAtom, jwtAtom, adminAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";
import { useNavigate } from 'react-router-dom';


const Sign_in = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const [jwt,setJwt] = useAtom(jwtAtom);
  const setAdmin = useSetAtom(adminAtom);


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
          Cookies.set('id', response.id);
          setAdmin(response.user.admin.toString());
          Cookies.set('admin', response.user.admin.toString());
          navigate('/');
      })
    
  }
 

  return (
    <>
      <form onSubmit={submitData}>
        <label htmlFor='email'> Email </label>
          <input 
            type="email"
            required
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
      <p>En vous enregistrant vous acceptez les cookies</p>
    </>
  );
};

export default Sign_in;