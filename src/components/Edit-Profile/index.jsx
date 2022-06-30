import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userIdAtom, jwtAtom } from '../../stores/user';
import {API_URL} from "../../stores/api_url";

const EditProfile = ({user}) => {

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
        "email": user.email,
        "current_password" : initialPassword,
        "password": newPassword,
      }
    };
    fetch(API_URL + '/users', {
      method: 'put',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("mot de passe modifié")
        console.log(response)

      })
    }

  return (
    <>
      <form onSubmit={submitData}>
        <label htmlFor='password'> Previous password </label>
          <input 
            type="password"
            required
            id='initialPassword'
            onChange={(e) => setInitialPassword(e.target.value)} 
          />

        <label htmlFor='password'> New password </label>
          <input 
            type="password" 
            id='newPassword'
            required
            onChange={(e) => setNewPassword(e.target.value)} 
          />

        <label htmlFor='passwordConfirmation'> Confirme new password </label>
          <input 
            type="password" 
            id='newPasswordConfirmation'
            required
            pattern={newPassword}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)} 
          />
        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
      </>
  );
};

export default EditProfile;