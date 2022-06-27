import React, {useState, useEffect} from 'react';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import Cookies from 'js-cookie'
import { userIdAtom, jwtAtom, adminAtom, cookieAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";
import { useNavigate } from 'react-router-dom';


const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const [jwt, setJwt] = useAtom(jwtAtom);
  const setAdmin = useSetAtom(adminAtom);
  const cookiechoice = useAtomValue(cookieAtom);





  const submitData = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      "user": {
        "email": email,
        "password": password
      }
    };
    fetch(API_URL + '/users/sign_in', {
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
        setUserId(response.user.id);
        setAdmin(response.user.admin.toString());
        if(cookiechoice){
          Cookies.set('id', response.user.id);
          Cookies.set('admin', response.user.admin.toString());
        }
        
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

        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
      {isLoading? <i className="fas fa-circle-notch fa-spin"></i>:null}
      <br />
      {cookiechoice? null : <p>En acceptant les cookies avant votre connexion nous pourrons maintenir votre connexion même si vous fermez la page web</p> }
      
    </>
  );
};

export default Login;