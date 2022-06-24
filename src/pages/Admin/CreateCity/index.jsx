import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { adminAtom, jwtAtom } from 'stores/user';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'stores/api_url';


const CreateCity = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom);


  useEffect(
    () => {
      if(admin === "false"){
        navigate('/')
      }
    }, []
  )

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.elements.name.value;
    const lat = Number(form.elements.lat.value);
    const long = Number(form.elements.long.value);
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
        "french_speaking" : french_speaking
      }
    }


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
          console.log("ville enregistrée")
          navigate('/');
      })

  }

  return (
    <div>
      <h1>Create</h1>

      <form onSubmit={onSubmit}>

        <input
          type='text'
          placeholder='nom de la ville'
          id='name'
          required
        />

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

        <input
          type='text'
          placeholder='image url'
          id='picture'
          required
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
              
        <button type='submit'>Créer ville</button>
      </form>
    </div>
  );
};

export default CreateCity;