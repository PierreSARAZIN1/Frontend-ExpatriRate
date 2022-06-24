import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAtom, jwtAtom } from 'stores/user';
import { API_URL } from 'stores/api_url';


const UpdateCity = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState([]);
  const jwt = useAtomValue(jwtAtom);
  const idCity = useParams().id;
  const [isLoading, setIsLoading] = useState(true)

  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [picture, setPicture] = useState('');
  const [overall, setOverall] = useState('');
  const [activities, setActivities] = useState('');
  const [cost, setCost] = useState('');
  const [works_places, setWorkPlaces] = useState('');
  const [healthcare, setHealthcare] = useState('');
  const [internet, setInternet] = useState('');
  const [safety, setSafety] = useState('');
  const [french_speaking, setFrenchSpeaking] = useState('');

  useEffect(
    () => {
      if(admin === "false"){
        navigate('/')
      }
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
              .then((response) =>{
                console.log(response)
                  setCountries(response)
              })
      }, []
  )

  useEffect(
    () => {
        fetch(API_URL + '/cities/' + idCity , {
            method: 'get',
            headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) =>{
              console.log(response)
                setCity(response)
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
                setIsLoading(false)
            })
    }, []
  )

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const country_id = Number(form.elements.countriesList.value);


    const data = {
      "city":{
        "name": name,
        "lat": lat,
        "long": long,
        "picture" : picture,
        "overall" : overall,
        "activities": activities,
        "cost": cost,
        "works_places" : works_places,
        "healthcare": healthcare,
        "internet" : internet,
        "safety" : safety,
        "french_speaking" : french_speaking,
        "country_id" : country_id
      }
    }

    fetch(API_URL + '/cities/' + idCity, {
      method: 'put',
      headers: {
          'Authorization' : jwt,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {return response.json()})
      .then((response) => {
          console.log("ville enregistrée")
          navigate('/');
      })

  }


  return (
    <div>
      <h1>Update</h1>
{isLoading? null :
      <form onSubmit={onSubmit}>

    <input
    type='text'
    placeholder='nom de la ville'
    id='name'
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.000001'
    placeholder='latitude'
    id='lat'
    value={lat}
    onChange={(e) => setLat(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.000001'
    placeholder='longitude'
    id='long'
    value={long}
    onChange={(e) => setLong(e.target.value)}
    required
    />

    <input
    type='text'
    placeholder='image url'
    id='picture'
    value={picture}
    onChange={(e) => setPicture(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='note global /5'
    id='overall'
    pattern='[0-5]'
    value={overall}
    onChange={(e) => setOverall(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='note activité /5'
    id='activities'
    pattern='[0-5]'
    value={activities}
    onChange={(e) => setActivities(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='cout de la vie en €'
    id='cost'
    value={cost}
    onChange={(e) => setCost(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='note works places /5'
    id='works_places'
    pattern='[0-5]'
    value={works_places}
    onChange={(e) => setWorkPlaces(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='note santé /5'
    id='healthcare'
    pattern='[0-5]'
    value={healthcare}
    onChange={(e) => setHealthcare(e.target.value)}
    required
    />

    <input
    type='number'
    placeholder='internet speed (en Mbps)'
    id='internet'
    value={internet}
    onChange={(e) => setInternet(e.target.value)}
    required
    />

    <input
    type='number'
    step = '0.01'
    placeholder='note safety /5'
    id='safety'
    pattern='[0-5]'
    value={safety}
    onChange={(e) => setSafety(e.target.value)}
    required
    />

    <label>Parle français?</label>
    {french_speaking? 
      <input
      type='checkbox'
      id='french_speaking'
      checked
      onChange={(e) => setFrenchSpeaking(e.target.checked)}
      />
    : 
      <input
      type='checkbox'
      id='french_speaking'
      onChange={(e) => setFrenchSpeaking(e.target.checked)}
      />
    }

    <select id="countriesList">
      {console.log(city.country.name)}
      <option value={city.country.id}>{city.country.name}</option>
    {countries.filter(element=> element.country.name != city.country.name).map(country => <option value={country.country.id}>{country.country.name}</option>) }
    </select>

    <button type='submit'>update ville</button>
    </form>
}

    
    </div>
  );
};

export default UpdateCity;