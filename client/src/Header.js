import { useDispatch, useSelector } from "react-redux"; 
import { storeUser } from './features/example/exampleSlice'
import { Link} from "react-router-dom";
import techtimeslogo from './techtimeslogo.PNG'
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

function Header({currentTemp, currentWeather, weatherIcon, city, usState, handleLogout}){

    const userFromStore = useSelector((state) => state.user) //getting this from the Redux store 
    const today = new Date()

    return (
        <div id="header_component">
            
            <div id="header-container1"> 
                <span id= "header-login-logout"> 
                    {userFromStore ? <Link className='' to={"/login"}><button onClick={handleLogout}>log out </button></Link> : <Link className='' to={"/login"}><button> sign up / log in </button></Link>}   
                    <br />
                    {userFromStore ? "Welcome, " + userFromStore.username + "! " : ""} 
                </span>
            </div>
            <div id="header-container2">
                <div id="header-date">{today.toDateString()} </div>
                <Link className='' to={"/"}> <span id="main_header">The Techie Times</span></Link>
               
               
                
                <div id="header-weather"> 
                    <br />
                    <Link className='' to={"/weather"}> {weatherIcon} {currentTemp}°F in {city}, {usState}</Link>
                </div>
            </div>
            <div id="header-container3">
            <Link className='' to={"/"}>Home</Link> | <Link className='' to={"/news"}>News</Link> | <Link className='' to={"/weather"}>Weather</Link> | <Link className='' to={"/games"}>Games</Link> | <Link className='' to={"/about"}>About</Link>
            </div>
          
            
        </div>
    )
}

export default Header; 
