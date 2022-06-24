import React from 'react';
import {Link} from "react-router-dom";
import './style.css';

const Card = ({city}) => {
    console.log(city);
    return (
        <div className="card">
            <Link to={"/city/" + city.city.id}>


            <div className="textElement">
            <div className="cardsFlex">
                <p>{city.city.french_speaking ? "Yes" : "No"}</p>
                <p>{city.city.internet}</p>
             </div>
             <div className="cardTexts">
                 <p>{city.city.name}</p>
                 <p className="cardTextCountry">{city.country.name}</p>
             </div>
            <div className="cardsFlex">
                 <p>{city.city.lat}</p>
                <p>{city.city.cost}</p>
            </div>
            </div>
            <img src={city.city.picture} className="cardPicture" alt="Image of our City"></img>
            </Link>
        </div>
)
    ;
};

export default Card;
