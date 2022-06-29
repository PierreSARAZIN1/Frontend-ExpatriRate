import React, {useState, useEffect} from 'react';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import Cookies from 'js-cookie'
import { userIdAtom, jwtAtom, adminAtom, cookieAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";
import { useNavigate, Link } from 'react-router-dom';


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
 
  const close = () => {
    navigate("/")
  }

  return (
    <div className='loginform'>
      <video className="background-video-form" autoPlay loop muted>
          <source src="https://player.vimeo.com/external/330412624.sd.mp4?s=853ea7644708b7986c992689dd351b0413d7b3ca&profile_id=&oauth2_token_id=57447761" type="video/mp4"></source>
      </video>
      <i className="fa-solid fa-xmark" onClick={close}></i>
      <div className='filterbackground' onClick={close}></div>
      <div className='logincontent'>
        <p className='emoji'>🥾</p>
        <h3>Sign in</h3>
      <form onSubmit={submitData}>
        <label htmlFor='email'> Email </label>
        <div className='inputstyle'>
          <input 
            type="email"
            required
            placeholder='Email...'
            pattern='[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}' 
            id='email'
            onChange={(e) => setEmail(e.target.value)} 
          />
          </div>

        <label htmlFor='password'> Password </label>
        <div className='inputstyle'>
          <input 
            type="password" 
            id='password'
            placeholder='Password...'
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
          </div>

        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
      <p className='alreadymember'>Don't have an account yet? <Link to="/sign_up">Signup</Link></p>

      {isLoading? <i className="fas fa-circle-notch fa-spin"></i>:null}
      <br />
      {cookiechoice? <p>If you don't accept cookies before you log in, we won't be able to maintain your connection even if you close the web page</p> : <p>By accepting cookies before you log in we will be able to maintain your connection even if you close the web page</p> }</div>
    </div>
  );
};

export default Login;