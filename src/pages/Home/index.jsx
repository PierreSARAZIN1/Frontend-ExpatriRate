import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import HeroBanner from 'components/Hero-banner';
import {API_URL} from "../../stores/api_url";
import style from './style.css';
import Footer from "../../components/Footer";


const Home = () => {

    const [citiesList, setCitiesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(6);
    const [cityResult, setCityResult] = useState([]);
    const [modal, setModal] = useState(false);
    const [countries, setCountries] = useState([]);
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

    useEffect(
        () => {
            fetch(API_URL + '/countries', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    setCountries(response)
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

    return (
        <main>
            <HeroBanner/>
            <>
                <div className="searchBar">
                    <button type="submit" className="searchByCountry" onClick={openModal}>Filter by Country
                    </button>
                    <div className="searchBarContent">
                        <div className='filter'>
                            <input type="text" placeholder="Search City" onChange={filter}></input>
                        </div>
                        {modal ?
                            <div className="modal">
                                {countries.map(country => {
                                    return (<p className="countryFiltered"
                                               onClick={filterByCountry}>{country.country.name}</p>)
                                })}
                            </div>
                            :
                            null
                        }
                        <p onClick={() => setCountryFiltered("")}>{countryFiltered}</p>
                    </div>

                </div>
            </>
            {isLoading ?
                null
                :
                <>
                    <div className="gridCards">
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
            <Footer/>
        </main>

    );
};

export default Home;