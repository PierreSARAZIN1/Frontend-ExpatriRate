import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import {API_URL} from "../../stores/api_url";



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
    <>
        {isLoading ?
        null
        :
            citiesList.map(city => <>{<Card city={city} key={city.id}/>}</>)
        }

    </>
  );
};

export default Home;