import React, { useState, useEffect } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { userIdAtom, jwtAtom, adminAtom, cookieAtom } from "../../stores/user";
import { API_URL } from "../../stores/api_url";
import { useNavigate, Link } from "react-router-dom";
import background from "../../assets/video/backgroundvideo.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [jwt, setJwt] = useAtom(jwtAtom);
  const setAdmin = useSetAtom(adminAtom);
  const cookiechoice = useAtomValue(cookieAtom);
  const [error, setError] = useState("");
  const regex = new RegExp("[a-zA-Z0-9.+-]+@[a-zA-Z]+.[a-zA-Z]{2,3}");

  useEffect(() => {
    if (jwt != "" && userId != "") {
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
    fetch(API_URL + "/users/sign_in", {
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
        setUserId(response.user.id);
        setAdmin(response.user.admin.toString());
        if (cookiechoice) {
          Cookies.set("id", response.user.id);
          Cookies.set("admin", response.user.admin.toString());
        }

        navigate("/");
      })
      .catch(err => setError("Invalid email or password."));
  };

  const close = () => {
    navigate("/");
  };

  const resetpassword = () => {
    if (regex.test(email)) {
      const data = {
        user: {
          email: email,
        },
      };
      fetch(API_URL + "/users/password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => navigate("/"));
    } else {
      setError(
        "Please enter a valid email in email field before try again for reset your password."
      );
    }
  };

  return (
    <div className="loginform">
      <video className="background-video-form" autoPlay loop muted>
        <source src={background} type="video/mp4"></source>
      </video>
      <i className="fa-solid fa-xmark" onClick={close}></i>
      <div className="filterbackground" onClick={close}></div>
      <div className="logincontent">
        <p className="emoji">🥾</p>
        <h3>Sign in</h3>
        <form onSubmit={submitData}>
          <label htmlFor="email"> Email </label>
          <div className="inputstyle">
            <input
              type="email"
              required
              placeholder="Email..."
              pattern="[a-zA-Z0-9.+-]+@[a-zA-Z]+.[a-zA-Z]{2,3}"
              id="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password"> Password </label>
          <div className="inputstyle">
            <input
              type="password"
              id="password"
              placeholder="Password..."
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <p className="alreadymember">
          Don't have an account yet? <Link to="/sign_up">Signup</Link>
        </p>
        <p className="alreadymember">
          Forgot password? For receive an email with password reset link, please
          click <span onClick={() => resetpassword()}>here</span>
        </p>
        <p className="error">{error}</p>
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

export default Login;
