import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'stores/api_url';
import { adminAtom, jwtAtom } from 'stores/user';

const Dashboard = () => {

  const navigate = useNavigate();
  const admin = useAtomValue(adminAtom);
  const jwt = useAtomValue(jwtAtom)


  useEffect(
    () => {
      if(admin === "false"){
        navigate('/')
      }
    }, []
  )

  const [citiesList, setCitiesList] = useState("");
  const [isLoading, setIsLoading] = useState(true);


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
        setCitiesList(citiesList.filter(element => element.id !== city))
      })


    }
  return (
    <>
      <table>
        <tr>
          <th>Ville</th>
          <th>Actions</th>
        </tr>
        {isLoading? 
          <i className="fas fa-circle-notch fa-spin"></i> 
        : 
          citiesList.map(city => 
            {return (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>
                <div>
                <Link to={"/city/"+ city.id}><i className="fa-solid fa-eye"></i></Link>&nbsp;
                <Link to={"/admin/update/"+ city.id}><i className="fa-solid fa-pen"></i></Link>&nbsp;
                <i className="fa-solid fa-trash-can" onClick={()=> deleteCity(city.id)}></i>
                </div>
              </td>
            </tr>
            )}
          )
        }
        
      </table>
    </>
  );
};

export default Dashboard;