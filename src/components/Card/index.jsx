import React from 'react';
import {Link} from "react-router-dom";
import './style.css';

const Card = ({city}) => {
    console.log(city);
    return (
        <div className="card">
            <Link to={"/city/" + city.id}>


            <div className="textElement">
            <div className="cardsFlex">
                <p>{city.french_speaking ? "Yes" : "No"}</p>
                <p>{city.internet}</p>
             </div>
             <div className="cardTexts">
                 <p>{city.name}</p>
                 <p className="cardTextCountry">Country</p>
             </div>
            <div className="cardsFlex">
                 <p>{city.lat}</p>
                <p>{city.cost}</p>
            </div>
            </div>
            <img src={city.picture} className="cardPicture" alt="Image of our City"></img>
            </Link>
        </div>
)
    ;
};

export default Card;
