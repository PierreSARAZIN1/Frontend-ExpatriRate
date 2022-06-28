import { useAtomValue } from 'jotai';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'stores/api_url';
import { adminAtom, jwtAtom } from 'stores/user';
import './style.css';


const Dashboard = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom)
  const [citiesList, setCitiesList] = useState("");
  const [countriesList, setCountriesList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editCountry, setEditCountry] = useState(false);
  const [newName, setNewName ] = useState("");
  const [newId, setNewId] = useState("") 


  useEffect(
    () => {
      if(admin === "false"){
        navigate('/')
      }
    }, []
  )




    useEffect(
        () => {
          fetch(API_URL + '/cities', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
              setCitiesList(response);
              setIsLoading(false);
            })

        }, [citiesList]
    )

    useEffect(
      () => {
        fetch(API_URL + '/countries', {
          method: 'get',
          headers: {
              'Content-Type': 'application/json'
          }
      })
          .then((response) => response.json())
          .then((response) => {
            setCountriesList(response);
            
          })

      }, [countriesList]
  )


    const deleteCity = (city) => {
      fetch(API_URL + '/cities/'+ city, {
        method: 'delete',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log("Ville supprimée");
        console.log(response);
        setCitiesList(citiesList.filter(element => element.city.id !== city))
      })
    }

    const deleteCountry = (country) => {
      fetch(API_URL + '/countries/'+ country, {
        method: 'delete',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log("Pays supprimé");
        console.log(response);
        setCountriesList(countriesList.filter(element => element.country.id !== country))
      })
    }
    
    const updateCountryName = (e) => {
      e.preventDefault();

      const data = {
        "country": {
          "name": newName.trim()
        }
      }

      fetch(API_URL + '/countries/'+ newId, {
        method: 'put',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setEditCountry(false)

      })
      
    }
  return (
    <div className='admin-table'>
      <br />
      <table>
        <tr>
          <th>Countries</th>
          <th>Cities</th>
          <th>Actions</th>
        </tr>
        {isLoading? 
          <i className="fas fa-circle-notch fa-spin"></i> 
        :
        countriesList.map(country => 
            {return (
            <tr key={country.country.id}>
              <td>{country.country.name}</td>
              <td>
                {(country.cities).map(city => 
                  {return (
                    <tr className="cities-list" key={city.id}>
                      {city.name}
                      <div>
                      <Link to={"/city/"+ city.id}><i className="fa-solid fa-eye"></i></Link>&nbsp;
                      <Link to={"/admin/update_city/"+ city.id}><i className="fa-solid fa-pen"></i></Link>&nbsp;
                      <i className="delete-city fa-solid fa-trash-can" onClick={()=> deleteCity(city.id)}></i>&nbsp;
                      </div>
                    </tr>
                  )}
                )}
              </td>
              <td>
                <div className='delete-country'>
                <i className="fa-solid fa-trash-can" onClick={()=> deleteCountry(country.country.id)}></i>&nbsp;
                <i className="fa-solid fa-pen" onClick={()=> {setEditCountry(true); setNewName(country.country.name); setNewId(country.country.id)}}></i>        
                </div>
              </td>
            </tr>
            )}
          )
        }
      </table>
      {editCountry?
        <div className='pop-up-edit'>
        <div className='filter-modal' onClick={()=> setEditCountry(false)}></div>
        <i className="fa-solid fa-xmark" onClick={()=> setEditCountry(false)}></i>
        <div className='content-edit'>
          <h1>Edit Country Name</h1>
          <form onSubmit={updateCountryName}>
            <div className='input-edit-city'>
              <input type="text" value={newName} onChange={(e)=> setNewName(e.target.value)}/> 
            </div>
            <button className='btn btn-primary' type='submit'>Submit</button>
          </form>
             
        </div>

        </div>
      :
      null
      }
      
    </div>
  );
};

export default Dashboard;