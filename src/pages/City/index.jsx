
import React, {useEffect, useState} from 'react';
import {API_URL} from "../../stores/api_url";
import './style.css'
import { useParams } from "react-router-dom";
import {jwtAtom} from "../../stores/user";
import {useAtomValue} from "jotai";
import {useNavigate} from "react-router-dom";
import useFetchCityInformations from "../../services/useFetchCityInformations";

const City = () => {

    const id= useParams().id;
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();

    const [city, setCity] = useState(" ");
    const [cityInfo, setCityInfo] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    const [cityName, setCityName] = useState(" ");
    const fetchCityInfo = useFetchCityInformations(cityName);
    useEffect(
        () => {
            if(jwt == ""){
                navigate("/sign_in");
            }
        }, []
    )
    useEffect(
        () => {
            fetch(API_URL + '/cities/' + id, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            })
                .then((response) => response.json())
                .then((response) =>{
                    setCity(response.city);
                    setCityName(response.city.name.toLowerCase());
                    setIsLoading(false);
                })
        }, []
    )
    return (
        <div>
            {isLoading? <i className="fas fa-circle-notch fa-spin"></i>:<div>Hello</div>}
        </div>
    );
};

export default City;