
import React, {useEffect, useState} from 'react';
import {API_URL} from "../../stores/api_url";
import './style.css'
import { useParams } from "react-router-dom";
import {jwtAtom} from "../../stores/user";
import {useAtomValue} from "jotai";
import {useNavigate} from "react-router-dom";
import {API_COST} from "../../stores/api_cost";
import TableCost from "../../components/TableCost";

const City = () => {

    const id= useParams().id;
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();

    const [city, setCity] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    const [cityName, setCityName] = useState(" ");
    const [cost, setCost] = useState([]);
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
                    fetch(API_COST + response.city.name, {
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            setCost(response.costs);
                            setIsLoading(false);
                        })


                })
        }, [id]
    )


    return (
        <>
        <div className="headerCity">
        <div>
            {isLoading? <i className="fas fa-circle-notch fa-spin"></i>:<div>Hello</div>}
        </div>
            <div className="imgShowCity" alt={"background image of" + cityName}>
                <h1>{cityName}</h1>
                <h3>Country name</h3>
                <p>{city.overall}</p>
            </div>
        </div>

        <div className="showRates">
            <table className="Rates">
                <tbody>
                <tr>
                    <td>Activities</td><td><progress value={city.activities} max="5" text-inside="true">{city.activities}</progress>{city.activities}</td>
                </tr>
                <tr>
                    <td>Cost</td><td>{city.cost}</td>
                </tr>
                <tr>
                    <td>Workplaces</td><td>{city.works_places}</td>
                </tr>
                <tr>
                    <td>Healthcare</td><td>{city.healthcare}</td>
                </tr>
                <tr>
                    <td>Internet</td><td>{city.internet}</td>
                </tr>
                <tr>
                    <td>Safety</td><td>{city.safety}</td>
                </tr>
                <tr>
                    <td>French Speaking</td><td>{city.french_speaking}</td>
                </tr>
                {cost.map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}

            </tbody>
            </table>

        </div>
            </>
    );
};

export default City;