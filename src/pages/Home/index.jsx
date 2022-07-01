import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import HeroBanner from 'components/Hero-banner';
import {API_URL} from "../../stores/api_url";
import useFetch from 'services/useFetch';
import './style.css';


const Home = () => {

    const [citiesList, setCitiesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(6);
    const [cityResult, setCityResult] = useState([]);
    const [modal, setModal] = useState(false);
    const [countries] = (useFetch(API_URL + '/countries'));
    const [countryFiltered, setCountryFiltered] = useState("");

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
                    setCitiesList(response)
                    setCityResult(response);
                    setIsLoading(false);
                })
        }, []
    )

    const filter = (e) => {
        setModal(false);
        if (e.target.value == undefined) {
            setCityResult(citiesList);
        } else {
            if (countryFiltered !== "") {
                setCityResult(citiesList.filter(country => country.country.name.toLowerCase() === countryFiltered.toLowerCase())
                    .filter(
                        city => city.city.name.toLowerCase().includes(e.target.value.toLowerCase())
                    ))
            } else {


                setCityResult(citiesList.filter(
                    city => city.city.name.toLowerCase().includes(e.target.value.toLowerCase())
                ))
            }
        }
    }

    const openModal = (e) => {
        e.preventDefault();
        setModal(!modal);
    }
    const filterByCountry = (e) => {
        setCountryFiltered(e.target.textContent);
        setCityResult(citiesList.filter(
            city => city.country.name === e.target.textContent
        ));
        setModal(false);
    }

    const removeCountryFilter = () => {
        setCityResult(citiesList);
        setCountryFiltered("")
    }

    return (
        <main>
            <HeroBanner/>
            <>
                <div className="search-bar">
                    <button type="submit" className="search-by-country" onClick={openModal}>Filter by Country</button>

                    <div className="search-bar-content">
                        <div className='filter'>
                            <input type="text" placeholder="Search City..." onChange={filter}></input>
                            <i className="fa-solid fa-circle-plus"></i>
                        </div>
                    </div>

                </div>

                {modal ?
                    <div className="modal">
                        {countries.filter(country => country.cities.length > 0).map(country =>
                            <p onClick={filterByCountry} key={country.country.id}>{country.country.name}</p>
                        )}
                    </div>
                    : null}

                {countryFiltered !== "" ?
                    <p className="country-filtered" onClick={() => removeCountryFilter()}>{countryFiltered} X</p>
                    : null}


            </>
            {isLoading ?
                null
                :
                <>
                    <div className="grid-cards">
                        {cityResult.slice(0, page).map(city => <Card city={city} key={city.city.id}/>)}
                    </div>

                    {cityResult.length > page ?
                        <div className='wrapper'>
                            <button className='btn btn-primary showmore' onClick={() => setPage(page + 6)}>Show more
                            </button>
                        </div>

                        : null}
                </>

            }
        </main>

    );
};

export default Home;