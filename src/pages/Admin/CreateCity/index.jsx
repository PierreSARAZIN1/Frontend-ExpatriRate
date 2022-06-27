import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { adminAtom, jwtAtom } from 'stores/user';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'stores/api_url';

// http://api.openweathermap.org/geo/1.0/direct?q=%7B{city name},{state code},{country code}&limit={limit}&appid={API key}
const CreateCity = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom);
  const [countries, setCountries]= useState([])
  const [countrySelected, setCountrySelected] = useState("")
  const [countrySelectedLat, setCountrySelectedLat] = useState("")
  const [countrySelectedLong, setCountrySelectedLong] = useState("")
  const [modalLatLong, setModalLatLong] = useState(false)
  const datalist = useRef(null)


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
                setCountries(response)
            })
    }, []
  )

  const onCountrySubmit = (e) =>{
    e.preventDefault();

    const country = e.target.elements.newCountry.value
    const array = Object.entries(datalist.current.options)

    if(countries.find(element => element.country.name.toLowerCase() == country.toLowerCase()) == undefined){

      const data = {
        "country":{
          "name": country.toLowerCase().split(" ").map(word => word[0].toUpperCase()+word.slice(1, word.length)).join(" ")
        }
      }

      fetch(API_URL + '/countries', {
        method: 'post',
        headers: {
            'Authorization' : jwt,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {return response.json()})
        .then((response) => {
            setCountries([...countries, {country: response}])
            setCountrySelected(response.id)
        })

    }else{
      
      setCountrySelected(Number(array.filter(element => element[1].value == e.target.elements.newCountry.value.toLowerCase().split(" ").map(word => word[0].toUpperCase()+word.slice(1, word.length)).join(" "))[0][1].id))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;



      if(modalLatLong === false){
        //`http://api.openweathermap.org/geo/1.0/direct?q=${data.city.name}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
        //http://api.openweathermap.org/geo/1.0/direct?q='+ form.elements.name.value +'&limit=1&appid=52af23a1aaa4751fe5ba05fa2e169f05
        fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ form.elements.name.value +'&limit=1&appid=52af23a1aaa4751fe5ba05fa2e169f05')
        .then((response) => response.json())
        .then((response) =>{
          if(response.length === 0){
            setModalLatLong(true)
          }else{
            setCountrySelectedLat(response[0].lat)
            setCountrySelectedLong(response[0].lon)
          }
        })
        .then( () => {
          if(countrySelectedLat !== ""){
            createCity(form)
          }
        })
      }else{createCity(form)}
  
    

  }

  const createCity =(form) => {
    

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
      "city":{
        "name": name,
        "lat": modalLatLong? Number(form.elements.lat.value) : countrySelectedLat,
        "long": modalLatLong? Number(form.elements.long.value) : countrySelectedLong,
        "picture" : picture, // === ""? "https://cdn.futura-sciences.com/buildsv6/images/wide1920/b/5/f/b5f08f3f32_50172797_city-2278497-1920.jpg" : picture
        "overall" : overall,
        "activities": activities,
        "cost": cost,
        "works_places" : works_places,
        "healthcare": healthcare,
        "internet" : internet,
        "safety" : safety,
        "french_speaking" : french_speaking,
        "country_id" : countrySelected
      }
    }
    console.log(data)
    fetch(API_URL + '/cities', {
      method: 'post',
      headers: {
          'Authorization' : jwt,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {return response.json()})
      .then((response) => {
        console.log(response)
          navigate('/');
      })
  }


  return (
    <div>
      <h1>Dans quel pays souhaitez vous ajouter une ville ?</h1>
      <br /><br />
      <form onSubmit={onCountrySubmit}>
      <input 
      type="text" 
      id="newCountry" 
      list="browsers"
      required />
          <datalist id="browsers" ref={datalist}>
          {countries.map(country => <option value={country.country.name} id={country.country.id}></option>) }
          </datalist>
      <button type='submit'>Valider le pays</button>
      </form>
      <h1>Ajout d'une nouvelle ville</h1>

        <form onSubmit={onSubmit}>

          <input
            type='text'
            placeholder='nom de la ville'
            id='name'
            required
          />
          {modalLatLong? 
          <>
              <input
              type='number'
              step = '0.000001'
              placeholder='latitude'
              id='lat'
              required
            />

            <input
              type='number'
              step = '0.000001'
              placeholder='longitude'
              id='long'
              required
            />
          </>
          
          : 
          null
          }


          <input
            type='text'
            placeholder='image url'
            id='picture'

          />

          <input
            type='number'
            step = '0.01'
            placeholder='note global /5'
            id='overall'
            pattern='[0-5]'
            required
          />

          <input
            type='number'
            step = '0.01'
            placeholder='note activité /5'
            id='activities'
            pattern='[0-5]'
            required
          />

          <input
            type='number'
            step = '0.01'
            placeholder='cout de la vie en €'
            id='cost'
            required
          />

          <input
            type='number'
            step = '0.01'
            placeholder='note works places /5'
            id='works_places'
            pattern='[0-5]'
            required
          />

          <input
            type='number'
            step = '0.01'
            placeholder='note santé /5'
            id='healthcare'
            pattern='[0-5]'
            required
          />

          <input
            type='number'
            placeholder='internet speed (en Mbps)'
            id='internet'
            required
          />

          <input
            type='number'
            step = '0.01'
            placeholder='note safety /5'
            id='safety'
            pattern='[0-5]'
            required
          />

          <label>Parle français?</label>
          <input
            type='checkbox'
            id='french_speaking'
          />


          <button type='submit'>Créer la ville</button>
        </form>
    </div>
  );
};

export default CreateCity;