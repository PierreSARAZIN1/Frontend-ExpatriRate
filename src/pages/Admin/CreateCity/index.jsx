import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { adminAtom, jwtAtom } from 'stores/user';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'stores/api_url';
import './style.css';

// http://api.openweathermap.org/geo/1.0/direct?q=%7B{city name},{state code},{country code}&limit={limit}&appid={API key}
const CreateCity = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom);
  const [countries, setCountries]= useState([])
  const [countrySelected, setCountrySelected] = useState("")
  const [countrySelectedLat, setCountrySelectedLat] = useState("")
  const [countrySelectedLong, setCountrySelectedLong] = useState("")
  const [editCountry, setEditCountry] = useState(true);
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
            setEditCountry(false)
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
        navigate('/');
      })
  }


  return (
    <div className='create-city-page'>
      {editCountry?
      <div className='pop-up-edit'>
        <div className='filter-modal'></div>
        <i className="fa-solid fa-house" onClick={()=> navigate ('/')}></i>
        <div className='content-edit'>
        <h1>Select or Create a country </h1>
        <form onSubmit={onCountrySubmit}>
          <div className='input-edit-city'>
            <input 
              type="text" 
              id="newCountry" 
              list="browsers"
              required />
            <datalist id="browsers" ref={datalist}>
            {countries.map(country => <option value={country.country.name} id={country.country.id}></option>) }
            </datalist>
          </div>
        <button type='submit' className='btn btn-primary'>Submit Country</button>
        </form>
        </div>
      </div>
      :
      null
      }
      <h1 className='title'>Create a new City</h1>
      <div className='create-city'>
        <form onSubmit={onSubmit} className="create-city-form">

          <input
            className='classic-input'
            type='text'
            placeholder='City Name'
            id='name'
            required
          />
          {modalLatLong? 
          <>
              <input
              className='classic-input'
              type='number'
              step = '0.000001'
              placeholder='latitude'
              id='lat'
              required
            />

            <input
              className='classic-input'
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
            className='classic-input'
            type='text'
            placeholder='image url'
            id='picture'

          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='Score : Overall /5'
            id='overall'
            pattern='[0-5]'
            required
          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='Score : Activities /5'
            id='activities'
            pattern='[0-5]'
            required
          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='cost of living en €'
            id='cost'
            required
          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='Score : works places /5'
            id='works_places'
            pattern='[0-5]'
            required
          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='Score : Healthcare /5'
            id='healthcare'
            pattern='[0-5]'
            required
          />

          <input
            className='classic-input'
            type='number'
            placeholder='internet speed (Mbps)'
            id='internet'
            required
          />

          <input
            className='classic-input'
            type='number'
            step = '0.01'
            placeholder='Score : Safety /5'
            id='safety'
            pattern='[0-5]'
            required
          />

          <label>French Speaking ?</label>
          <input
            className='french-speaking-input'
            type='checkbox'
            id='french_speaking'
          />


          <button type='submit' className='btn btn-primary'>Create City</button>
        </form>
        </div>
    </div>
  );
};

export default CreateCity;