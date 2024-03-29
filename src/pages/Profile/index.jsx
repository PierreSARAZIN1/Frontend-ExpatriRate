import React, { useEffect, useState } from "react";
import EditProfile from "../../components/Edit-Profile";
import { useAtomValue, useAtom } from "jotai";
import { userIdAtom, jwtAtom, adminAtom } from "../../stores/user";
import { API_URL } from "../../stores/api_url";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import background from "../../assets/images/profilebackground.jpeg";
import "./style.css";

const Profile = () => {
  const idParams = useParams().id;
  const navigate = useNavigate();
  const [jwt, setJwt] = useAtom(jwtAtom);
  const [admin, setAdmin] = useAtom(adminAtom);
  const [id, setId] = useAtom(userIdAtom);
  const [user, setUser] = useState("");
  const [modifyProfile, setModifyProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritecity, setFavoritecity] = useState([]);
  const [citylike, setCitylike] = useState([]);

  useEffect(() => {
    if (jwt == "" && id == "") {
      navigate("/sign_up");
    } else if (id !== idParams) {
      navigate("/profile/" + id);
    }
  }, []);

  useEffect(() => {
    fetch(API_URL + "/member-data", {
      method: "get",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        setFavoritecity(response.favorite);
        setUser(response.user);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const deleteaccount = () => {
    fetch(API_URL + "/users", {
      method: "delete",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        setJwt("");
        setId("");
        setAdmin("false");
        Cookies.remove("id");
        Cookies.remove("token");
        Cookies.remove("admin");
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  const redirect = e => {
    navigate("/city/" + e);
  };

  return (
    <div className="profile">
      <img
        className="profilbackground"
        src={background}
        alt="background image for profile"
      ></img>
      <h1>Welcome Young Expat' !</h1>
      <div className="flexbuttonprofile">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setModifyProfile(!modifyProfile);
          }}
        >
          Modify your password
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("êtes vous sur de supprimer votre compte ?")) {
              deleteaccount();
            }
          }}
        >
          Delete your account
        </button>
      </div>

      {modifyProfile ? <EditProfile user={user} /> : null}

        <h3>❤️ My Favorite Cities</h3>
      {favoritecity.length === 0 ? (
        <p>
          You didn't have favorite city yet ! Go discover your{" "}
          <Link to="/">futur place !</Link>
        </p>
      ) : (
        <div className="flexminicard">
          {favoritecity.map(city => (
            <div className="minicard" key={city.id} onClick={() => redirect(city.id)}>
              <img src={city.picture} alt={city.name}></img>
              <h5>{city.name}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
