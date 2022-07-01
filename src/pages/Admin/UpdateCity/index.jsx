import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminAtom, jwtAtom } from "stores/user";
import { API_URL } from "stores/api_url";

import "./style.css";

const UpdateCity = () => {
  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState([]);
  const jwt = useAtomValue(jwtAtom);
  const idCity = useParams().id;
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [picture, setPicture] = useState("");
  const [overall, setOverall] = useState("");
  const [activities, setActivities] = useState("");
  const [cost, setCost] = useState("");
  const [works_places, setWorkPlaces] = useState("");
  const [healthcare, setHealthcare] = useState("");
  const [internet, setInternet] = useState("");
  const [safety, setSafety] = useState("");
  const [french_speaking, setFrenchSpeaking] = useState("");

  useEffect(() => {
    if (admin === "false") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(API_URL + "/countries", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        setCountries(response);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(API_URL + "/cities/" + idCity, {
      method: "get",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        setCity(response);
        setName(response.city.name);
        setLat(response.city.lat);
        setLong(response.city.long);
        setPicture(response.city.picture);
        setOverall(response.city.overall);
        setActivities(response.city.activities);
        setCost(response.city.cost);
        setWorkPlaces(response.city.works_places);
        setHealthcare(response.city.healthcare);
        setInternet(response.city.internet);
        setSafety(response.city.safety);
        setFrenchSpeaking(response.city.french_speaking);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const country_id = Number(form.elements.countriesList.value);

    const data = {
      city: {
        name: name
          .toLowerCase()
          .split(" ")
          .map(word => word[0].toUpperCase() + word.slice(1, word.length))
          .join(" "),
        lat: lat,
        long: long,
        picture: picture,
        overall: overall,
        activities: activities,
        cost: cost,
        works_places: works_places,
        healthcare: healthcare,
        internet: internet,
        safety: safety,
        french_speaking: french_speaking,
        country_id: country_id,
      },
    };

    fetch(API_URL + "/cities/" + idCity, {
      method: "put",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="update-city-page">
      <div className="update-city-form-page">
        <h1 className="title">Update</h1>
        <div className="update-city">
          {isLoading ? null : (
            <form onSubmit={onSubmit} className="update-city-form">
              <tr>
                <td>
                  <label>Latitude </label>
                </td>
                <td>
                  <input
                    className="classic-input"
                    type="number"
                    step="0.000001"
                    id="lat"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <table>
                <tr>
                  <td>
                    <label>City Name </label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Latitude </label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.000001"
                      id="lat"
                      value={lat}
                      onChange={e => setLat(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Longitude </label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.000001"
                      id="long"
                      value={long}
                      onChange={e => setLong(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>City image </label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="text"
                      id="picture"
                      value={picture}
                      onChange={e => setPicture(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Overall (/5)</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="overall"
                      pattern="[0-5]"
                      value={overall}
                      onChange={e => setOverall(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Activities (/5)</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="activities"
                      pattern="[0-5]"
                      value={activities}
                      onChange={e => setActivities(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Life Cost</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="cost"
                      value={cost}
                      onChange={e => setCost(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Works places (/5)</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="works_places"
                      pattern="[0-5]"
                      value={works_places}
                      onChange={e => setWorkPlaces(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Healthcare (/5)</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="healthcare"
                      pattern="[0-5]"
                      value={healthcare}
                      onChange={e => setHealthcare(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Internet Speed</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      id="internet"
                      value={internet}
                      onChange={e => setInternet(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Safety (/5)</label>
                  </td>
                  <td>
                    <input
                      className="classic-input"
                      type="number"
                      step="0.01"
                      id="safety"
                      pattern="[0-5]"
                      value={safety}
                      onChange={e => setSafety(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>French speaking ?</label>
                  </td>
                  {french_speaking ? (
                    <td>
                      <input
                        className="french-speaking-input"
                        type="checkbox"
                        id="french_speaking"
                        checked
                        onChange={e => setFrenchSpeaking(e.target.checked)}
                      />
                    </td>
                  ) : (
                    <td>
                      <input
                        className="french-speaking-input"
                        type="checkbox"
                        id="french_speaking"
                        checked
                        onChange={e => setFrenchSpeaking(e.target.checked)}
                      />
                    </td>
                  )}
                </tr>
                <tr>
                  <td>
                    <label> Country</label>
                  </td>
                  <td>
                    <select id="countriesList">
                      <option value={city.country.id}>
                        {city.country.name}
                      </option>
                      {countries
                        .filter(
                          element => element.country.name != city.country.name
                        )
                        .map(country => (
                          <option value={country.country.id}>
                            {country.country.name}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              </table>
              <button type="submit" className="btn btn-primary">
                Update City Data
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCity;
