import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import style from './style.css';

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="" />
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/sign_in">S'inscrire</Link>
        </li>
        <li>
          <Link to="/login">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;