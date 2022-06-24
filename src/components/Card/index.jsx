import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { API_URL } from 'stores/api_url';
import { jwtAtom, userIdAtom } from 'stores/user';
import './style.css';

const Card = ({city}) => {
    

    const id = useAtomValue(userIdAtom)
    const jwt = useAtomValue(jwtAtom)
    const [like, setLike] = useState(city.favorite.map(element => element.id == Number(id)).length >0 ? true : false)

    const likeACity = () => {

        const data = {
            'join_table_favorite_city': {
                "user_id": Number(id),
                "city_id": city.city.id
            }
        };
        fetch(API_URL + '/join_table_favorite_cities', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                setLike(true)
            })

    }

    const unlikeACity = () => {
        // fetch(API_URL + '/join_table_favorite_cities/', {
        //     method: 'delete',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': jwt
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         console.log(response)
        //         setLike(true)
        //     })
    }

    return (
        <div className="card">
            {like ? 
            <p className='likeCity' onClick={() => unlikeACity()}><i className="fa-solid fa-heart" ></i></p>
              
            : 
            <p className='likeCity' onClick={() => likeACity()}><i className="fa-regular fa-heart" ></i></p> }
           
            <Link to={"/city/" + city.city.id}>
            <div className="textElement">
                <div className="cardsFlex">
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
