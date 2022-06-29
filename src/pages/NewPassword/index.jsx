import React, {useState} from "react";
import { useParams } from "react-router-dom";
import './style.css';
import { API_URL } from '../../stores/api_url'

const NewPassword = () => {

  const token = useParams().token;
  const [password, setPassword] = useState("");


  const setNewpassword = () => {
    const data = {
      "user": {
        "reset_password_token": token,
        "password": password
      }
    };
    fetch(API_URL + '/users/password', {
      method: 'put',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
  }

  return(
    <div className="formnewpassword">
      <h1>Modify your Password :</h1>
      <form onSubmit={setNewpassword}>
        <div className="inputstyle"><input 
        type="text"
        pattern="/^[a-zA-Z0-9]{6,30}$/"
        placeholder="New Password..."
        ></input>
          </div>
        <button type="submit" className="btn btn-primary">Modify password</button>
      </form>
    </div>
  )
}

export default NewPassword;