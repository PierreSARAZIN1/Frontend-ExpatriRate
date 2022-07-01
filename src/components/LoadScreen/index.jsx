import React from 'react';
import logo from '../../assets/images/logo.gif';
import './style.css';

const LoadScreen = () => (
  <section className='loadingmain'>
    <div className='loadingviewcontent'>
      <img className='loadingscreen' src={logo} alt="planet earth turning on itself" />
      <h1>Expatrirate</h1>

    </div>
  </section>
)
export default LoadScreen;