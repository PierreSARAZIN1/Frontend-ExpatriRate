import React from 'react';
import {Link} from "react-router-dom";
import './style.css'

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h1>It seems that you're not at the right <span>place</span> !</h1>
            <p>Come back <Link to="/" id="link-from-not-found">here</Link> dear expatriate!</p>
        </div>
    );
};

export default PageNotFound;