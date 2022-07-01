import { useState, useEffect } from "react";

const useFetchWeather = (lat, long) => {

    const [data, setData] = useState(null);

    useEffect(() => {

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
           .then((response) => response.json())
           .then((responseData) =>  setData(responseData)) 
    }, [lat, long]);


    return [data];
};

export default useFetchWeather;