import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import HeroBanner from 'components/Hero-banner';
import {API_URL} from "../../stores/api_url";
import style from './style.css';



const Home = () => {

    const [citiesList, setCitiesList] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(
        () => {
            fetch(API_URL + '/cities', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    setCitiesList(response);
                    setIsLoading(false);
                })

        }, []
    )

  return (
    <main>
        <HeroBanner/>
        {isLoading ?
        null
        :
            <div className="gridCards">{citiesList.map(city => <>{<Card city={city} key={city.id}/>}</>)}</div>
        }

    </main>
  );
};

export default Home;