
import React, {useEffect, useState} from 'react';
import {API_URL} from "../../stores/api_url";
import './style.css'
import { useParams } from "react-router-dom";
import {jwtAtom} from "../../stores/user";
import {useAtomValue} from "jotai";
import {useNavigate} from "react-router-dom";
import {API_COST} from "../../stores/api_cost";
import TableCost from "../../components/TableCost";
import { Overall, ProgressBar, ProgressBarCost,Overallborder } from 'components/StyleComponent';

const City = () => {

    const id= useParams().id;
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();

    const [city, setCity] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    const [cityName, setCityName] = useState(" ");
    const [cost, setCost] = useState([]);
    const [country, setCountry] = useState([]);
    useEffect(
        () => {
            if(jwt == ""){
                navigate("/sign_up");
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
                    console.log(response)
                    setCity(response.city);
                    setCountry(response.country)
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
        {isLoading? <div className='loading'><p>Loading...</p><i className="fas fa-circle-notch fa-spin"></i></div>:
        <>
            <div className="headerCity">   
                <img src={city.picture} alt={"picture" + city.name}></img>
                <div className="imgShowCity" alt={"background image of" + cityName}>
                    <h1>{cityName}</h1>
                    <h3>{country.name}</h3>
                </div>
            </div>

            <h2 className='overallscore'><Overallborder score={city.overall}>Overall: <Overall score={city.overall}>{city.overall}</Overall>/5</Overallborder></h2>

            <div className="showRates">
                <table className="rates">
                    <tbody>
                    <tr>
                        <td>😝 Activities</td>
                        <td>{city.activities < 3? "🥱":null}</td>
                        <div className='progress'><ProgressBar width={(city.activities * 100 / 5)}>{city.activities}/5</ProgressBar></div>
                    </tr>
                    <tr>
                        <td>💵 Cost</td>
                        <td>{city.cost > 2500? "🥵": null}</td>
                        <td><div className='progress'><ProgressBarCost width={(city.cost * 100 / 5000)}>{city.cost > 2500 ? <>{city.cost}<span>$/mo</span> </> : " " }</ProgressBarCost>{city.cost <= 2500 ? <p className="costMessage"> {city.cost}<span>$/mo</span> </p> : null}</div></td>
                    </tr>
                    <tr>
                        <td>💻 Workplaces</td>
                        <td>{city.works_places < 3? "😟" : null}</td>
                        <td><div className='progress'><ProgressBar width={(city.works_places * 100 / 5)}>{city.works_places}/5</ProgressBar></div></td>
                    </tr>
                    <tr>
                        <td>🚑 Healthcare</td>
                        <td>{city.healthcare < 3? "🤕": null}</td>
                        <td><div className='progress'><ProgressBar width={(city.healthcare * 100 / 5)}>{city.healthcare}/5</ProgressBar></div></td>
                    </tr>

                    <tr>
                        <td>👌 Safety</td>
                        <td>{city.safety < 3? "😨" : null}</td>
                        <td><div className='progress'><ProgressBar width={(city.safety * 100 / 5)}>{city.safety}/5</ProgressBar></div></td>
                    </tr>
                    <tr>
                        <td>📡 Internet</td>
                        <td>{city.internet > 30? "🚀" : null}</td>
                        <td><i className="fa-solid fa-wifi"></i> {city.internet} Mbps</td>
                    </tr>
                    <tr>
                        <td>🗣️ French Speaking</td>
                        <td></td>
                        <td>{city.french_speaking? "Yes 🇫🇷" : "No 😥"}</td>
                    </tr>
                    <h2>🍽️ Restaurants</h2>
                    {cost.slice(0,8).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🛒 Markets</h2>
                    {cost.slice(8,27).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🚎 Transportation</h2>
                    {cost.slice(27,35).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>📩 Utilities(Monthly)</h2>
                    {cost.slice(35,38).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>⚽ Sports and Leisure</h2>
                    {cost.slice(38,41).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🧸 Childcare</h2>
                    {cost.slice(41,43).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>👗 Clothing and Shoes</h2>
                    {cost.slice(43,47).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🛏️ Rent per Month</h2>
                    {cost.slice(47,51).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🏠 Buy apartment price</h2>
                    {cost.slice(51,53).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    <h2>🤑 Salaries and Financing</h2>
                    {cost.slice(53,54).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                    {cost.slice(54,55).map((cost, index) => 
                        <tr>
                            <td>{cost.item}</td>
                            <td></td>
                            <td>{cost.cost}</td>
                        </tr>
                    )}




                </tbody>
                </table>

            </div>
        </>
        }
        </>
    );
};

export default City;