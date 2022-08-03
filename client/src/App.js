
import logo from './logo.svg';

import React from 'react'
import './App.css';
import Header from './Header';
import Home from './Home';
import News from './News';
import About from './About';
import Login from './Login'; 
import Footer from './Footer';
import Article from './Article';
import Weather from './Weather';
import Games from './Games';
import { useEffect, useState } from 'react';


import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"; 

//Redux Action Creators

import { storeUser } from './features/example/exampleSlice'

function App() {

  const [articles, setArticles] = useState([])

  useEffect( ()=>{
      fetch('/articles')
      .then(resp => resp.json())
      .then(data => { 
          setArticles(data)})
  }, [])


// Testing out the redux store 
  // read from the Redux store
  // const items = useSelector((state) => state.items);
  // const thing = useSelector((state) => state.myStateThing) //getting this from the store 
  const userFromStore = useSelector((state) => state.user) //getting this from the store 

  const [user, setUser] = useState(null); //change to redux store 

  // gives us the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();


  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setUser(data) 
          dispatch(storeUser(data))
        }); 
      }
    });
  }, []);

    // LOG IN AND OUT 

    function handleLogout(){
      fetch("/logout",{
        method: "DELETE"
      })
     .then( () => {
        setUser(null)
        dispatch(storeUser(null))
      })
    }

    function submitLogin (e, username, password){
      e.preventDefault(); 
      fetch("/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      }).then( (r) => {
          if (r.ok) {
            r.json().then((data) => {
              setUser(data)
              dispatch(storeUser(data))
            });
          } else {
            r.json().then((err) => {
              console.log(err)
            });
          }
      }) 
    }

  // Current weather 

  const [currentWeather, setCurrentWeather] = useState("")
  const [currentTemp, setCurrentTemp] = useState("")
  const [zipcode, setZipcode] = useState('10004') 
  const [urlGeo, setUrlGeo] = useState(`https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}`)
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [timezone, setTimezone] = useState("")
  const [city, setCity] = useState("")
  const [usState, setUsState] = useState("")

useEffect( ()=> {
  fetch('https://ipapi.co/postal')
    .then( resp => resp.text()) //this api gives a plain text response 
    .then (data => {
      setZipcode(data)
      setUrlGeo(`https://geocoding-api.open-meteo.com/v1/search?name=${data}`)
    })
}, [])

  useEffect( () => {
    fetch (urlGeo)
    .then(response => response.json())
    .then(data => {
        setLat(Number.parseFloat(data.results[0].latitude).toFixed(2))
        setLong(Number.parseFloat(data.results[0].longitude).toFixed(2));
        setTimezone(data.results[0].timezone); 
        setCity(data.results[0].name)
        setUsState(data.results[0].admin1)
       
    })
}, [urlGeo])

useEffect( () => {
    handleWeather(); 
    }, [lat, long])

// lat and long in the API URL come from the handleGeo function that calls the weather callback 

function handleWeather(){  
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timezone}`)
        .then(resp => resp.json())
        .then(weatherData => {
            //get weather 
            let weatherCode = weatherData.current_weather.weathercode
            if ([0, 1, 2].includes(weatherCode)){
                  setCurrentWeather('clear'); 
                }
            else if ([3, 45, 48].includes(weatherCode)){
                  setCurrentWeather('cloudy'); 
                }
            else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)){
                  setCurrentWeather('raining'); 
                }
            else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)){
                  setCurrentWeather('snowing'); 
                }
            setCurrentTemp(Math.round(weatherData.current_weather.temperature))
        })  
  }




  return (
    <div className="App">
    <Header currentTemp={currentTemp} currentWeather={currentWeather} city={city} usState={usState} handleLogout={handleLogout} />
    { articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 
    {userFromStore ? userFromStore.username : ""}
    <Route exact path="/"> <Home />  </Route>
    <Route path="/news"> <News />  </Route>
    <Route path="/login"> <Login handleLogout={handleLogout} submitLogin={submitLogin} />  </Route>
    <Route path="/about"><About /> </Route>
    <Route path="/weather"><Weather zip={zipcode} /> </Route>
    <Route path="/games"><Games /></Route>
    <Footer />

    </div>
  );
}

export default App;


