import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

import {Typewriter} from 'react-simple-typewriter';

const HeroBanner = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const Register = (e) => {
    e.preventDefault();
    console.log(email)
    if(email !== ""){
      navigate('/sign_up', {
        state:{
          email: email
        }
      })
    }
  }

  return (
    <>
    <div className='heroBanner'>
        <video className="background-video" autoPlay loop muted>
          <source src="https://player.vimeo.com/external/330412624.sd.mp4?s=853ea7644708b7986c992689dd351b0413d7b3ca&profile_id=&oauth2_token_id=57447761" type="video/mp4"></source>
        </video>
        <div className='text-banner'>
          <div className='text-content'>
            <h1>✈️ No more surprises for expatriates</h1>
            <h2>🌎 Join an international expat community to discover incridible thing about your new home </h2><h2 className='typewriterlike'>like 
            <span className='typewriter'><Typewriter
              loopcursor
              loop
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              words={["coffee price", "cost of restaurant for 2", "price of rent", "life cost"]}
            /></span></h2>
          </div>
          
          <div className="modalregistration">
            <img src='https://www.tyntec.com/drimage/920/0/1037/d_travel02.png'></img>
            <form onSubmit={Register}>
              <div className='registrationinputhome' >
                <input 
                  type="text" 
                  placeholder='Type your email...'
                  pattern='[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}' 
                  onChange={(e) => setEmail(e.target.value)}
                />
                </div>        
              <button type='submit'>Join Expatrirate Community</button>
            </form>
            <p>Already a member? <Link to="/login">Log in</Link></p>
            

          </div>
        </div>
        <div className='divSVG'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            {/* #0078f1 */}
            <path fill="#f3f4f5" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;