import React from "react";
import { useAtomValue } from "jotai";
import { userIdAtom, jwtAtom } from "../../stores/user";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  const id = useAtomValue(userIdAtom);
  const jwt = useAtomValue(jwtAtom);

  return (
    <>
      <footer>
        <div className="container">
          <div className="title-footer">
            <h3>
              Your <span>next place</span> deserve a good grade right?
            </h3>
          </div>
          <div id="container-footer">
            <div className="team">
              <h4>Our Team</h4>
              <ul className="list-team">
                <li>
                  <a
                    className="footer-link"
                    href="https://github.com/Bastien-Arlot"
                  >
                    Bastien
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://github.com/guillaume-rygn"
                  >
                    Guillaume
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://github.com/PierreSARAZIN1"
                  >
                    Pierre
                  </a>
                </li>
              </ul>
            </div>
            <div className="Contact">
              <h4>Contact</h4>
              <a
                id="mail-adress"
                href="mailto: expatrirate@gmail.com?subject=Any Questions?&body=Feel free to send us your question"
              >
                Email us 💌
              </a>
            </div>
            <div className="account-footer">
              <h4>Account</h4>
              <p>
                {id !== "" || jwt !== "" ? (
                  <Link to={"/profile/" + id}>Profile</Link>
                ) : (
                  <Link to="/sign_up">SignUp</Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>Copyright © 2022 ExpatriRate - All Rigths Reserved</p>
        <Link to="/privacy_policy">Policy Privacy</Link>
      </div>
    </>
  );
};

export default Footer;
