import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';
import { API_URL } from '../../stores/api_url'

const NewPassword = () => {
  const navigate = useNavigate();
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
      method: 'patch',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  }

  return(
    <div className="formnewpassword">
      <h1>Modify your Password :</h1>
      <form onSubmit={setNewpassword}>
        <div className="inputstyle"><input 
        type="text"
        placeholder="New Password..."
        onChange={(e)=>setPassword(e.target.value)}
        ></input>
          </div>
        <button type="submit" className="btn btn-primary">Modify password</button>
      </form>
    </div>
  )
}

export default NewPassword;