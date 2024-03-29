import React, { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { adminAtom, jwtAtom } from "stores/user";
import { useNavigate } from "react-router-dom";
import { API_URL } from "stores/api_url";
import "./style.css";
import { API_COST } from "stores/api_cost";

const CreateCity = () => {
  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [editCountry, setEditCountry] = useState(true);
  const [modalLatLong, setModalLatLong] = useState(false);
  const datalist = useRef(null);
  const [error, setError] = useState("");

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

  const onCountrySubmit = e => {
    e.preventDefault();

    const country = e.target.elements.newCountry.value;
    const array = Object.entries(datalist.current.options);

    if (
      countries.find(
        element => element.country.name.toLowerCase() == country.toLowerCase()
      ) == undefined
    ) {
      const data = {
        country: {
          name: country
            .toLowerCase()
            .split(" ")
            .map(word => word[0].toUpperCase() + word.slice(1, word.length))
            .join(" "),
        },
      };

      fetch(API_URL + "/countries", {
        method: "post",
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
          setCountries([...countries, { country: response }]);
          setCountrySelected(response.id);
          setEditCountry(false);
        })
        .catch(err => console.error(err));
    } else {
      //This code allows us to have the id of the country selected in the Datalist input to use it for the city creation
      setCountrySelected(
        Number(
          array.filter(
            element =>
              element[1].value ==
              e.target.elements.newCountry.value
                .toLowerCase()
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1, word.length))
                .join(" ")
          )[0][1].id
        )
      );
      setEditCountry(false);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;

    if (modalLatLong === false) {
      fetch(
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
          form.elements.name.value +
          "&limit=1&appid="+ process.env.REACT_APP_API_KEY

      )
        .then(response => response.json())
        .then(response => {
          if (response.length === 0) {
            setModalLatLong(true);
            setIsLoading(false);
          } else {
            validinformationcity(form, response[0].lat, response[0].lon);
          }
        })
        .catch(err => console.error(err));
    } else {
      validinformationcity(form, 0, 0);
    }
  };

  const validinformationcity = (form, lat, long) => {
    fetch(
      API_COST +
        form.elements.name.value
          .toLowerCase()
          .split(" ")
          .map(word => word[0].toUpperCase() + word.slice(1, word.length))
          .join(" ")
    )
      .then(response => response.json())
      .then(response => {
        if (response.costs.length > 0) {
          createCity(form, lat, long);
        } else {
          setError(
            "Sorry, we don't have enough information about this city to create it as a base."
          );
          setIsLoading(false);
        }
      })
      .catch(err => console.error(err));
  };

  const createCity = (form, lat, long) => {
    const name = form.elements.name.value;
    const picture = form.elements.picture.value;
    const overall = Number(form.elements.overall.value);
    const activities = Number(form.elements.activities.value);
    const cost = Number(form.elements.cost.value);
    const works_places = Number(form.elements.works_places.value);
    const healthcare = Number(form.elements.healthcare.value);
    const internet = Number(form.elements.internet.value);
    const safety = Number(form.elements.safety.value);
    const french_speaking = form.elements.french_speaking.checked;

    const data = {
      city: {
        name: name
          .toLowerCase()
          .split(" ")
          .map(word => word[0].toUpperCase() + word.slice(1, word.length))
          .join(" "),
        lat: modalLatLong ? Number(form.elements.lat.value) : lat,
        long: modalLatLong ? Number(form.elements.long.value) : long,
        picture: picture,
        overall: overall,
        activities: activities,
        cost: cost,
        works_places: works_places,
        healthcare: healthcare,
        internet: internet,
        safety: safety,
        french_speaking: french_speaking,
        country_id: countrySelected,
      },
    };
    fetch(API_URL + "/cities", {
      method: "post",
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
    <div className="create-city-page">
      {editCountry ? (
        <div className="pop-up-edit">
          <div className="filter-modal"></div>
          <i className="fa-solid fa-house" onClick={() => navigate("/")}></i>
          <div className="content-edit">
            <h1>Select or Create a country </h1>
            <form onSubmit={onCountrySubmit}>
              <div className="input-edit-city">
                <input type="text" id="newCountry" list="browsers" required />
                <datalist id="browsers" ref={datalist}>
                  {countries.map(country => (
                    <option
                      value={country.country.name}
                      id={country.country.id}
                    ></option>
                  ))}
                </datalist>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Country
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="create-city-form-page">
        <h1 className="title">Create a new City</h1>
        <div className="create-city">
          <form onSubmit={onSubmit} className="create-city-form">
            <input
              className="classic-input"
              type="text"
              placeholder="City Name"
              id="name"
              required
            />
            {modalLatLong ? (
              <>
                <input
                  className="classic-input"
                  type="number"
                  step="0.000001"
                  placeholder="latitude"
                  id="lat"
                  required
                />

                <input
                  className="classic-input"
                  type="number"
                  step="0.000001"
                  placeholder="longitude"
                  id="long"
                  required
                />
              </>
            ) : null}

            <input
              className="classic-input"
              type="text"
              placeholder="image url"
              id="picture"
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="Score : Overall /5"
              id="overall"
              pattern="[0-5]"
              required
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="Score : Activities /5"
              id="activities"
              pattern="[0-5]"
              required
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="cost of living en €"
              id="cost"
              required
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="Score : works places /5"
              id="works_places"
              pattern="[0-5]"
              required
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="Score : Healthcare /5"
              id="healthcare"
              pattern="[0-5]"
              required
            />

            <input
              className="classic-input"
              type="number"
              placeholder="internet speed (Mbps)"
              id="internet"
              required
            />

            <input
              className="classic-input"
              type="number"
              step="0.01"
              placeholder="Score : Safety /5"
              id="safety"
              pattern="[0-5]"
              required
            />

            <label>French Speaking ?</label>
            <input
              className="french-speaking-input"
              type="checkbox"
              id="french_speaking"
            />

            <button type="submit" className="btn btn-primary">
              Create City
            </button>
            <p className="error">{error}</p>
            {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCity;
