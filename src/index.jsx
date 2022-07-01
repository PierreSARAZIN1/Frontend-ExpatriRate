import React from 'react';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './style.css'


const container = document.getElementById('root');
const root = createRoot(container);

const Index = () => {
    return (
    <BrowserRouter>
      <App />
    </BrowserRouter>   
);
}

root.render(<Index tab="home" />)
