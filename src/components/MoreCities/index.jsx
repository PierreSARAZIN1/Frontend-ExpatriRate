import React, { useEffect, useState } from "react";
import Card from "components/Card";
import useFetch from "services/useFetch";
import { API_URL } from "stores/api_url";
import { useParams } from "react-router-dom";
import "./style.css";

const MoreCities = ({ country, city }) => {
  const id = useParams().id;
  const [cities] = useFetch(API_URL + "/cities");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(cities);
    setIsLoading(true);
    if (cities !== null) {
      setIsLoading(false);
    }
  }, [id, cities]);

  return (
    <>
      {isLoading ? null : cities
          .filter(
            element =>
              element.country.name == country.name &&
              element.city.name !== city.name
          )
          .slice(0, 3).length == 0 ? (
        <>
          <h2 className="h2marge">
            ❤️ Other cities you are going to love :
          </h2>
          <div className="more-cities-cards">
            {cities
              .filter(
                element =>
                  element.city.overall > city.overall - 0.5 &&
                  element.city.name !== city.name
              )
              .slice(0, 3)
              .map(element => (
                <Card city={element} key={element.city.id} />
              ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="h2marge">❤️ Other cities from the same country :</h2>
          <div className="more-cities-cards">
            {cities
              .filter(
                element =>
                  element.country.name == country.name &&
                  element.city.name !== city.name
              )
              .slice(0, 3)
              .map(element => (
                <Card city={element} key={element.city.id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default MoreCities;
