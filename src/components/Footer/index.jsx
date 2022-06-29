import React from 'react';
import './style.css';
import {useAtom, useAtomValue} from 'jotai';
import {userIdAtom} from "../../stores/user";
import {Link} from "react-router-dom";

const Footer = () => {

    const id = useAtomValue(userIdAtom);


    return (<>
        <footer>
            <div className="container">
            <div className="title-footer">
                <h3>Your <span>next place</span> deserve a good grade right?</h3>
            </div>
            <div id="container-footer">
                <div className="team">
                    <h4>Our Team</h4>
                    <ul className="list-team">
                        <li>
                        <a className="footer-link" href="https://github.com/Bastien-Arlot">
                            Bastien
                        </a>
                        </li>
                        <li>
                            <a className="footer-link" href="https://github.com/guillaume-rygn">
                                Guillaume
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="https://github.com/PierreSARAZIN1">
                                Pierre
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="Contact">
                    <h4>Contact</h4>
                    <p id="mail-adress">mailtosend</p>
                </div>
                <div className="Account-footer">
                    <h4>Account</h4>
                    <p>{id ? <Link to={"/profile/" + id}>Profile</Link> : <Link to="/sign_up">SignUp</Link>}</p>
                </div>
            </div>

            </div>
        </footer>
    <div className="copyright">
        <p>Copyright ©  2022 ExpatriRate - All Rigths Reserved</p>
        <Link to='/policy_privacy'>Policy Privacy</Link>
    </div>
    </>
    );
};

export default Footer;