import {useAtomValue} from 'jotai';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {API_URL} from 'stores/api_url';
import {jwtAtom, userIdAtom} from 'stores/user';
import {ProgressBar, ProgressBarCost} from "../StyleComponent";
import './style.scss';

const Card = ({city}) => {


    const id = useAtomValue(userIdAtom);
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();
    const [like, setLike] = useState(city.favorite.filter(element => element.id == Number(id)).length > 0 ? true : false);
    const [likeid, setLikeId] = useState(city.like.filter(element => element.user_id == Number(id)).length > 0 ? city.like.filter(element => element.user_id == Number(id))[0].id : "")
    const [icon, setIcon] = useState("");
    const [tempeture, setTempeture] = useState('');


    // useEffect(
    //     () => {
    //       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.city.lat}&lon=${city.city.long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    //       .then((response) => response.json())
    //       .then((responseData) => {
    //         setIcon(responseData.weather[0].icon);
    //         setTempeture(responseData.main.temp)
    //       })
    //     },[]
    // )


    const likeACity = () => {

        if (id !== "") {
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
            navigate('/sign_up')
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
            .then(() => setLike(false))
    }

    return (
        <div className="card">
            {jwt == "" && id == ""?  
            <p className='like-city' onClick={() => likeACity()}><i className="fa-solid fa-heart icon-heart"></i></p>
            : 
            like ?
                <p className='like-city' onClick={() => unlikeACity()}><i
                    className="fa-solid fa-heart icon-heart-full"></i></p>
                :
                <p className='like-city' onClick={() => likeACity()}><i className="fa-solid fa-heart icon-heart"></i>
                </p>
            }

            <Link to={"/city/" + city.city.id}>
                <div className="text-element">
                    <div className="cards-flex">
                        <div className='wifitext'>
                            <i className="fa-solid fa-wifi"></i>
                            <span>{city.city.internet}<br></br><p>Mbps</p></span>
                        </div>
                    </div>

                    <div className="card-texts">
                        <p>{city.city.name}</p>
                        <p className="card-text-country">{city.country.name}</p>
                    </div>

                    <div className="cards-flex">
                        <p className='tempeture'>{icon == "" ? null : <><img className="iconweather" src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"} alt="image of temperature"></img>{Number(tempeture).toFixed(1)}°C</>}</p>
                        <p>${city.city.cost} / mo</p>
                    </div>
                </div>

                <div className="hover-card-info">
                    <div className="categories">
                        <p>😝 Activities</p>
                        <div className='progresscard'>
                            <ProgressBar width={(city.city.activities * 100 / 5)}></ProgressBar>
                        </div>
                    </div>

                    <div className="categories">
                        <p>💵 Cost</p>
                        <div className='progresscard'>
                            <ProgressBarCost width={(city.city.cost * 100 / 5000)}></ProgressBarCost>
                        </div>
                    </div>

                    <div className="categories">
                        <p>💻 Workplaces</p>
                        <div className='progresscard'>
                            <ProgressBar width={(city.city.works_places * 100 / 5)}></ProgressBar>
                        </div>
                    </div>

                    <div className="categories">
                        <p>🚑 Healthcare</p>
                        <div className='progresscard'>
                            <ProgressBar width={(city.city.healthcare * 100 / 5)}></ProgressBar>
                        </div>
                    </div>
                    <div className="categories">
                        <p>👌 Safety</p>
                        <div className='progresscard'>
                            <ProgressBar width={(city.city.safety * 100 / 5)}></ProgressBar>
                        </div>
                    </div>
                    
                </div>
                <img src={city.city.picture} className="card-picture" alt="Image of our City"></img>
            </Link>
        </div>
    )
        ;
};

export default Card;
