import React, { useEffect, useState } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { userIdAtom, jwtAtom, adminAtom, cookieAtom } from "../../stores/user";
import { API_URL } from "../../stores/api_url";
import style from "./style.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

import background from "../../assets/video/backgroundvideo.mp4";
import "./style.css";

const Sign_up = () => {
  const location = useLocation();
  const [email, setEmail] = useState(
    location.state === null ? "" : location.state.email
  );
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [jwt, setJwt] = useAtom(jwtAtom);
  const setAdmin = useSetAtom(adminAtom);
  const cookiechoice = useAtomValue(cookieAtom);

  useEffect(() => {
    if (jwt !== "" && userId !== "") {
      navigate("/");
    }
  }, []);

  const submitData = e => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      user: {
        email: email,
        password: password,
      },
    };
    fetch(API_URL + "/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        setJwt([...response.headers.get("authorization")].join(""));
        if (cookiechoice) {
          Cookies.set(
            "token",
            [...response.headers.get("authorization")].join("")
          );
        }
        return response.json();
      })
      .then(response => {
        setUserId(response.id);
        setAdmin(response.user.admin.toString());
        if (cookiechoice) {
          Cookies.set("id", response.id);
          Cookies.set("admin", response.user.admin.toString());
        }

        navigate("/");
      })
      .catch(err => console.error(err));
  };

  const close = () => {
    navigate("/");
  };

  return (
    <div className="loginform">
      <video className="background-video-form" autoPlay loop muted>
        <source src={background} type="video/mp4"></source>
      </video>
      <i className="fa-solid fa-xmark" onClick={close}></i>
      <div className="filterbackground" onClick={close}></div>
      <div className="logincontent">
        <p className="emoji">🗺️</p>
        <h3>Sign up</h3>
        <form onSubmit={submitData}>
          <label htmlFor="email"> Email </label>
          <div className="inputstyle">
            <input
              type="email"
              placeholder="Email..."
              required
              value={email}
              pattern="[a-zA-Z0-9.+-]+@[a-zA-Z]+.[a-zA-Z]{2,3}"
              title="Please respect email format : email@email.com"
              id="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password"> Password </label>
          <div className="inputstyle">
            <input
              type="password"
              placeholder="Password..."
              pattern="[a-zA-Z0-9.+-]{6,30}"
              title="Please enter a password between 6 and 30 character"
              id="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <label htmlFor="passwordConfirmation"> Confirme password </label>
          <div className="inputstyle">
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Confirme password..."
              title="Please enter the same password"
              required
              pattern={password}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Sign up now
          </button>
        </form>
        <p className="alreadymember">
          Already a member? <Link to="/login">Log in</Link>
        </p>
        {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : null}
        <br />
        {cookiechoice ? (
          <p>
            If you don't accept cookies before you log in, we won't be able to
            maintain your connection even if you close the web page
          </p>
        ) : (
          <p>
            By accepting cookies before you log in we will be able to maintain
            your connection even if you close the web page
          </p>
        )}
      </div>
    </div>
  );
};

export default Sign_up;
