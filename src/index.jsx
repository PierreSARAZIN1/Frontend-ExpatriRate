import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import {
    BrowserRouter,
  } from 'react-router-dom';
import './style.css'


const Index = () => {
    return (
    <BrowserRouter>
      <App />
    </BrowserRouter>   
);
}
  ReactDOM.render(<Index />, document.getElementById('root'));