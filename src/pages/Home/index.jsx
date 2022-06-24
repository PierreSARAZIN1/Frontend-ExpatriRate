import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import HeroBanner from 'components/Hero-banner';
import {API_URL} from "../../stores/api_url";
import style from './style.css';



const Home = () => {

    const [citiesList, setCitiesList] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(6);

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
                    // console.log(response);
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
        <>
            <div className="gridCards">
                {citiesList.slice(0,page).map(city => <>{<Card city={city} key={city.id}/>}</>)}
            </div>

            {citiesList.length > page? 
                <div className='wrapper'>
                    <button className='btn btn-primary showmore' onClick={()=> setPage(page + 6)}>Show more</button> 
                </div>
                
            : null}
        </>
            
        }

    </main>
  );
};

export default Home;