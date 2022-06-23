import { useState, useEffect } from "react";

const useFetchCityInformations = (city) => {

    const [data, setData] = useState(null);

    useEffect(() => {

        if(city !== " "){

        fetch('https://apicost.herokuapp.com/' + city)
            .then((response) => response.json())
            .then((data) => setData(data)); }
    }, [city]);


    return [data];
};

export default useFetchCityInformations;