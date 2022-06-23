import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userIdAtom, jwtAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";

const EditProfile = () => {

  const [initialPassword, setInitialPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const jwt = useAtomValue(jwtAtom)

  const submitData = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      "user": {
        // "current_password": initialPassword,
        "password": newPassword,
        "password_confirmation": newPasswordConfirmation
      }
    };
    fetch(API_URL + '/users/auth/password', {
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

      })
    }

  return (
    <>
      <form onSubmit={submitData}>
        <label htmlFor='password'> Ancien mot de passe </label>
          <input 
            type="password"
            required
            id='initialPassword'
            onChange={(e) => setInitialPassword(e.target.value)} 
          />

        <label htmlFor='password'> Mot de passe </label>
          <input 
            type="password" 
            id='newPassword'
            required
            onChange={(e) => setNewPassword(e.target.value)} 
          />

        <label htmlFor='passwordConfirmation'> Confirmez le mot de passe </label>
          <input 
            type="password" 
            id='newPasswordConfirmation'
            required
            pattern={newPassword}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)} 
          />
        <button type="submit">Submit</button>
      </form>
      </>
  );
};

export default EditProfile;