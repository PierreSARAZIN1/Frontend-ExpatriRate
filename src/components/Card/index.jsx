import { useAtomValue } from 'jotai';
import React, { useState, useEffect } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { API_URL } from 'stores/api_url';
import { jwtAtom, userIdAtom } from 'stores/user';
import './style.css';

const Card = ({city}) => {
    


    const id = useAtomValue(userIdAtom);
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();
    const [like, setLike] = useState(city.favorite.filter(element => element.id == Number(id)).length > 0 ? true : false);

    const [likeid, setLikeId] = useState(city.like.filter(element => element.user_id == Number(id)).length > 0 ? city.like.filter(element => element.user_id == Number(id))[0].id : "")

    const[icon, setIcon] = useState("");
    const[tempeture, setTempeture]= useState('')


    const API_key = '52af23a1aaa4751fe5ba05fa2e169f05';

    useEffect(
        () => {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.city.lat}&lon=${city.city.long}&appid=${API_key}&units=metric`)
          .then((response) => response.json())
          .then((responseData) => {
            setIcon(responseData.weather[0].icon);
            setTempeture(responseData.main.temp)
          })
        },[]
    )


    const likeACity = () => {

        if(id !== ""){
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
                setLikeId(response.id)
                setLike(true)
            })
        } else {
            navigate('/sign_in')
        }
    }

    const unlikeACity = () => {
     fetch(API_URL + '/join_table_favorite_cities/' + likeid, {
         method: 'delete',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': jwt
         }
     })
    .then((response) => setLike(false))

    }

    return (
        <div className="card">
            {like ? 
            <p className='likeCity' onClick={() => unlikeACity()}><i className="fa-solid fa-heart icon-heart-full" ></i></p>
              
            : 
            <p className='likeCity' onClick={() => likeACity()}><i className="fa-solid fa-heart icon-heart" ></i></p> }
           
            <Link to={"/city/" + city.city.id}>
            <div className="textElement">
                <div className="cardsFlex">
                    <p className='wifitext'><i className="fa-solid fa-wifi"></i> <span>{city.city.internet}<br></br><p>Mbps</p></span></p>
                </div>
                <div className="cardTexts">
                    <p>{city.city.name}</p>
                    <p className="cardTextCountry">{city.country.name}</p>
                </div>
                <div className="cardsFlex">
                    <p className='tempeture'><img className="iconweather" src={"http://openweathermap.org/img/wn/"+ icon + "@2x.png"}></img>{Number(tempeture).toFixed(1)}°C</p>
                    <p>${city.city.cost} / mo</p>
                </div>
            </div>
            <img src={city.city.picture} className="cardPicture" alt="Image of our City"></img>
            </Link>
        </div>
)
    ;
};

export default Card;
