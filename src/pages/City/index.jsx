import React, {useEffect, useState} from 'react';
import './style.scss'
import {useParams, useNavigate} from "react-router-dom";
import {jwtAtom, userIdAtom} from "../../stores/user";
import {useAtomValue} from "jotai";
import {API_COST} from "../../stores/api_cost";
import {API_URL} from "../../stores/api_url";
import TableCost from "../../components/TableCost";
import {Overall, ProgressBar, ProgressBarCost, Overallborder} from 'components/StyleComponent';
import MoreCities from 'components/MoreCities';


const City = () => {

    const id = useParams().id;
    const jwt = useAtomValue(jwtAtom);
    const navigate = useNavigate();
    const [city, setCity] = useState(" ");
    const [isLoading, setIsLoading] = useState(true);
    const [cityName, setCityName] = useState(" ");
    const [cost, setCost] = useState([]);
    const [country, setCountry] = useState([]);
    const userId = useAtomValue(userIdAtom);

    useEffect(
        () => {
            if (jwt == "" || userId == "") {
                navigate("/sign_up");
            }
        }, []
    )

    useEffect(
        () => {
            fetch(API_URL + "/cities/" + id, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    setCity(response.city);
                    setCountry(response.country)
                    setCityName(response.city.name.toLowerCase());
                    fetch(API_COST + response.city.name, {})
                        .then((response) => response.json())
                        .then((response) => {
                            setCost(response.costs);
                            setIsLoading(false);
                        })
                        .catch((err) => console.error(err));
                })
        }, [id]
    )


    return (
        <>
            <div className='back' onClick={() => navigate('/')}>
                <i class="fa-solid fa-arrow-left"></i><h2>Home</h2>
            </div>
            
            {isLoading ?
                <div className='loading'><p>Loading...</p><i className="fas fa-circle-notch fa-spin"></i></div> :
                <>
                    <div className="header-city">
                        <img src={city.picture} alt={"picture" + city.name}></img>
                        <div className="img-show-city" alt={"background image of" + cityName}>
                            <h1>{cityName}</h1>
                            <h3>{country.name}</h3>
                        </div>
                    </div>

                    <h2 className='overallscore'><Overallborder score={city.overall}>Overall: <Overall
                        score={city.overall}>{city.overall}</Overall>/5</Overallborder></h2>

                    <div className="show-rates">
                        <table className="rates">
                            <tbody>
                            <tr>
                                <td>😝 Activities</td>
                                <td>{city.activities < 3 ? "🥱" : null}</td>
                                <td className='progress'><ProgressBar
                                    width={(city.activities * 100 / 5)}>{city.activities}/5</ProgressBar></td>
                            </tr>
                            <tr>
                                <td>💵 Cost</td>
                                <td>{city.cost > 2500 ? "🥵" : null}</td>
                                <td className='progress'>
                                    <ProgressBarCost
                                        width={(city.cost * 100 / 5000)}>{city.cost > 2500 ? <>{city.cost}<span>$/mo</span> </> : " "}</ProgressBarCost>{city.cost <= 2500 ?
                                        <p className="cost-message"> {city.cost}<span>$/mo</span></p> : null}
                                </td>
                            </tr>
                            <tr>
                                <td>💻 Workplaces</td>
                                <td>{city.works_places < 3 ? "😟" : null}</td>
                                <td className='progress'>
                                    <ProgressBar
                                        width={(city.works_places * 100 / 5)}>{city.works_places}/5</ProgressBar>
                                </td>
                            </tr>
                            <tr>
                                <td>🚑 Healthcare</td>
                                <td>{city.healthcare < 3 ? "🤕" : null}</td>
                                <td className='progress'>
                                    <ProgressBar
                                        width={(city.healthcare * 100 / 5)}>{city.healthcare}/5</ProgressBar>
                                </td>

                            </tr>

                            <tr>
                                <td>👌 Safety</td>
                                <td>{city.safety < 3 ? "😨" : null}</td>
                                <td className='progress'>
                                    <ProgressBar
                                        width={(city.safety * 100 / 5)}>{city.safety}/5</ProgressBar>
                                </td>
                            </tr>
                            <tr>
                                <td>📡 Internet</td>
                                <td>{city.internet > 30 ? "🚀" : null}</td>

                                <td><i className="fa-solid fa-wifi"></i> {city.internet} Mbps</td>
                            </tr>
                            <tr>
                                <td>🗣️ French Speaking</td>
                                <td></td>
                                <td>{city.french_speaking ? "Yes 🇫🇷" : "No 😥"}</td>
                            </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🍽️ Restaurants</tr>
                            {cost.slice(0, 8).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🛒 Markets</tr>
                            {cost.slice(8, 27).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🚎 Transportation</tr>
                            {cost.slice(27, 35).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">📩 Utilities(Monthly)</tr>
                            {cost.slice(35, 38).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">⚽ Sports and Leisure</tr>
                            {cost.slice(38, 41).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🧸 Childcare</tr>
                            {cost.slice(41, 43).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">👗 Clothing and Shoes</tr>
                            {cost.slice(43, 47).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🛏️ Rent per Month</tr>
                            {cost.slice(47, 51).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🏠 Buy apartment price</tr>
                            {cost.slice(51, 53).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            <tr></tr>
                            <tr></tr>
                            <tr className="tr-tbcost">🤑 Salaries and Financing</tr>
                            {cost.slice(53, 54).map((cost, index) => <TableCost key={index} cost={cost}></TableCost>)}
                            {cost.slice(54, 55).map((cost, index) =>

                                <tr key={index}>
                                    <td>{cost.item}</td>
                                    <td></td>
                                    <td>{cost.cost}</td>
                                </tr>
                            )}

                            </tbody>
                        </table>

                    </div>
                <MoreCities country={country} city={city}/>

                </>


            }
        </>
    );
};

export default City;