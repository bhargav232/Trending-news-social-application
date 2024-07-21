import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { API } from "../backend";
import { isLoggedIn, logout } from "../auth/helper";
import "../styles.css";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#800080" };
    }
};

const Header = (history) => {
    const abc = useHistory();


    const Menu = () => {

        const googleAuth = () => {
            window.open(
                `${API}/googlelogin`,
                "_self"
            );
        }

        return(
            <div>
                <nav className="navbar justify-content-between">
                    <a href="/" className="navbar-brand">
                        <img src="https://i.ibb.co/NV1tJFB/01.jpg" width="300" height="100" alt="Logo" className="d-inline-block align-middle" />
                    </a>
                    <ul className="nav nav-tabs ">
                        <li className="nav-item"><Link style={currentTab(history, "/")} className="nav-link" to="/"> Home </Link></li>
                        <li className="nav-item"><Link style={currentTab(history, "/explore")} className="nav-link" to="/explore"> Explore News </Link></li>
                        {isLoggedIn() && (
                            <li className="nav-item"><Link style={currentTab(history, "/social")} className="nav-link" to="/social"> Social </Link></li>)}
                        {isLoggedIn() && (
                            <li className="nav-item"><Link style={currentTab(history, "/myprofile")} className="nav-link" to="/myprofile"> myprofile </Link></li>)}
                        {!isLoggedIn() && (
                            <li className="nav-item">
                                <span className="nav-link" onClick={googleAuth}>
                                    <img className="img px-2" src="https://i.ibb.co/XYT3xHz/google.png" width={50} height={30} alt="google icon" />
                                    Sign in With Google
                                </span>
                            </li>
                        )}
                        {isLoggedIn() && (
                            <li className="nav-item">
                                <span className="nav-link" onClick={()=> {
                                    logout(()=>{
                                        abc.push("/");
                                    })
                                }}>
                                    Log out
                                </span>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }

    return(
        <div>
            {Menu()}
        </div>
    );    
}

export default withRouter(Header);