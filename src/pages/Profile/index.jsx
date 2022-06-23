import React, {useEffect, useState} from 'react';
import style from './style.css';
import EditProfile from '../../components/Edit-Profile';
import { useAtomValue, useAtom } from 'jotai';
import { userIdAtom, jwtAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Profile = () => {

  const navigate = useNavigate()
  const [jwt, setJwt] = useAtom(jwtAtom);
  const [id, setId] = useAtom(userIdAtom);
  const [user, setUser] = useState("");
  const [modifyProfile, setModifyProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



    useEffect(
      () => {
          fetch(API_URL + '/member-data', {
              method: 'get',
              headers: {
                'Authorization': jwt,
                'Content-Type': 'application/json'
              }
          })
              .then((response) => response.json())
              .then((response) => {
                  console.log(response.user);
                  setUser(response.user);
                  setIsLoading(false);
              })

      }, []
  )

  const deleteaccount = () =>{

    fetch(API_URL + '/users', {
      method: 'delete',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setJwt('');
      setId('');
      Cookies.set('id', "")
      Cookies.set('token', "")
      navigate('/')
    })
  }


  return (
    <>
      <h1>Bonjour {user.email}</h1>
      <button 
        className=''
        onClick = {() => {setModifyProfile(!modifyProfile)} }>
        Modifier mon Mot de Passe
      </button>
      {modifyProfile? <EditProfile/> : null}
      <button 
      className="" 
      onClick={() => {
          if(window.confirm('êtes vous sur de supprimer votre compte ?'))
          {deleteaccount()};
        }}>
          Supprimer mon compte
      </button>
    </>
  );
};

export default Profile;