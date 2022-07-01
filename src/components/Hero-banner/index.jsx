import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { userIdAtom, jwtAtom } from "../../stores/user";
import background from "../../assets/video/backgroundvideo.mp4";
import picturemodale from "../../assets/images/modalregister.png";
import "./style.css";
import { useAtomValue } from "jotai";

const HeroBanner = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const jwt = useAtomValue(jwtAtom);
  const id = useAtomValue(userIdAtom);

  const Register = e => {
    e.preventDefault();
    console.log(email);
    if (email !== "") {
      navigate("/sign_up", {
        state: {
          email: email,
        },
      });
    }
  };

  return (
    <>
      <section className="hero-banner">
        <video className="background-video" autoPlay loop muted>
          <source src={background}></source>
        </video>
        <div className="text-banner">
          <div className="text-content">
            <h1>✈️ No more surprises for expatriates</h1>
            <h2>
              🌎 Join an international expat community to discover incredible
              thing about your new home
            </h2>
            <h2 className="typewriterlike">
              like
              <span className="typewriter">
                <Typewriter
                  loopcursor
                  loop
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  words={[
                    "coffee price",
                    "cost of restaurant for 2",
                    "cost of rent",
                    "cost of living",
                    "cost of bus ticket"
                  ]}
                />
              </span>
            </h2>
          </div>
          {jwt != "" && id != "" ? null : (
            <div className="modalregistration">
              <img src={picturemodale} alt="logo with travelers"></img>
              <form onSubmit={Register}>
                <div className="registrationinputhome">
                  <input
                    type="text"
                    placeholder="Type your email..."
                    pattern="[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit">Join Expatrirate Community</button>
              </form>
              <p>
                Already a member? <Link to="/login">Log in</Link>
              </p>
            </div>
          )}
        </div>
        <div className="div-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f8f9fa"
              fillOpacity="1"
              d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
