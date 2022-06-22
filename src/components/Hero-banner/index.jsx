import React from 'react';
import style from './style.css';

const HeroBanner = () => {
  return (
    <>
    <div className='heroBanner'>
        <video className="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg%22%3E">
          <source src="https://player.vimeo.com/external/330412624.sd.mp4?s=853ea7644708b7986c992689dd351b0413d7b3ca&profile_id=&oauth2_token_id=57447761" type="video/mp4"></source>
        </video>
        <div className='text-banner'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae praesentium similique ea. Temporibus repellat sit culpa accusamus labore vel, libero, ad tenetur autem, sint quaerat dicta dolorum adipisci? Quibusdam, repellat!</p>
        </div>
        <div className='divSVG'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            {/* #0078f1 */}
            <path fill="#f3f4f5" fill-opacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;