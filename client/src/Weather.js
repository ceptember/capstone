import React from "react";
import {useState, useEffect} from 'react'

// Icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

function Weather({}){

    const [searchZip, setSearchZip] = useState('')
    const [zipcode, setZipcode] = useState('10004') 
    const [urlGeo, setUrlGeo] = useState(`https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}`)
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [timezone, setTimezone] = useState("")
    const [city, setCity] = useState("")
    const [usState, setUsState] = useState("")

    const [cityName, setCityName] = useState('')
    const [cityResults, setCityResults] = useState([])

    const [currentWeather, setCurrentWeather] = useState("")
    const [todayWeather, setTodayWeather] = useState("")
    const [tomorrowWeather, setTomorrowWeather] = useState("")
    const [currentTemp, setCurrentTemp] = useState("")
    const [todayHigh, setTodayHigh] = useState("")
    const [todayLow, setTodayLow] = useState("")
    const [tomorrowHigh, setTomorrowHigh] = useState("")
    const [tomorrowLow, setTomorrowLow] = useState("")
    const [weatherIcon, setWeatherIcon] = useState("")
    const [icons, setIcons] = useState("")



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
            let US_results = data.results.filter( x => x.country_code == "US")
            let resultObj = US_results[0]
            setLat(Number.parseFloat(resultObj.latitude).toFixed(2))
            setLong(Number.parseFloat(resultObj.longitude).toFixed(2));
            setTimezone(resultObj.timezone); 
            setCity(resultObj.name)
            setUsState(resultObj.admin1)
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
                let weathercodesNowTodayTomorrow = [weatherData.current_weather.weathercode, weatherData.daily.weathercode[0], weatherData.daily.weathercode[1]]
                let nowTodayTomorrow = []; 
                let nowTodayTomorrowIcons = []
                for (let x of weathercodesNowTodayTomorrow){
                    if ([0, 1, 2].includes(x)){
                        nowTodayTomorrow.push('clear'); 
                        nowTodayTomorrowIcons.push(<FontAwesomeIcon icon={faSun} style={{color: "orange"}}/>)
                    }
                    else if ([3, 45, 48].includes(x)){
                        nowTodayTomorrow.push('cloudy'); 
                        nowTodayTomorrowIcons.push( <FontAwesomeIcon icon={faCloud} style={{color: "#7799FF"}} />)
                    }
                    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(x)){
                        nowTodayTomorrow.push('rain'); 
                        nowTodayTomorrowIcons.push(<FontAwesomeIcon icon={faCloudRain} style={{color: "#555577"}} />)

                    }
                    else if ([71, 73, 75, 77, 85, 86].includes(x)){
                        nowTodayTomorrow.push('snow'); 
                        nowTodayTomorrowIcons.push(<FontAwesomeIcon icon={faSnowflake} style={{color: "#7799FF"}} />)
                    }
                }
                setCurrentWeather(nowTodayTomorrow[0]); 
                setTodayWeather(nowTodayTomorrow[1]); 
                setTomorrowWeather(nowTodayTomorrow[2]); 
                setIcons(nowTodayTomorrowIcons)

                setCurrentTemp(weatherData.current_weather.temperature)
                setTodayHigh(weatherData.daily.temperature_2m_max[0])
                setTodayLow(weatherData.daily.temperature_2m_min[0])
                setTomorrowHigh(weatherData.daily.temperature_2m_max[1])
                setTomorrowLow(weatherData.daily.temperature_2m_min[1])

            })  
    }

    //NOTE there is an issue with the external API (not mine), &count= appears to not be working, it can only return 10 results
    function listCities(e){
        setCityName(e.target.value)
        if (e.target.value.length > 2 ){
            let urlCity = "https://geocoding-api.open-meteo.com/v1/search?name=" + e.target.value
            console.log(urlCity)
            fetch(urlCity)
                .then(resp => resp.json())
                .then(data => {
                    let resultsUS = data.results.filter( x => x.postcodes) 
                    console.log(resultsUS)
                    setCityResults(resultsUS)
                })
        }
    }

    function handleSearchCity(e,city){
        setZipcode(e.target.id)
        setUrlGeo(`https://geocoding-api.open-meteo.com/v1/search?name=${e.target.id}`)
        document.querySelector("#cityInput").value = ""
        setCityResults([])
    }

    function handleSearchZip(e){
        e.preventDefault()
        setZipcode(searchZip)
        setUrlGeo(`https://geocoding-api.open-meteo.com/v1/search?name=${searchZip}`)
        setSearchZip("")
    }
 

//use this to search by city 
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=100
    return(
        <div className="main_component_holder">
            <h1>Weather</h1>
           
            Search by Zipcode
        
            <form onSubmit={handleSearchZip}> 
                <input value={searchZip} onChange={(e) => setSearchZip(e.target.value)}></input>
                <input type="submit"></input>
            </form>
            Search by U.S. city name 
            <form> 
                <input id="cityInput" onChange={ (e) => listCities(e)} ></input>
            </form>
           
            { cityResults ? cityResults.map( x => <li key={x.id}> {x.name}, {x.admin1} <button id={x.postcodes[0]} onClick={ (e) => handleSearchCity(e)} >search</button> </li>) : ""}

            <br />
            Showing data for:
            <h2>{city}, {usState} {zipcode} </h2>
            <h3>Today's weather: </h3>
The current temperature is <span className="dynamic_span">{currentTemp}°F</span>
<br /><br />
<span className="dynamic_span">{currentWeather} {icons[0]} </span>right now, and <span className="dynamic_span">{todayWeather} {icons[1]} </span> today
<br /><br />


Today's high: <span className="dynamic_span">{todayHigh}°F;</span> Today's low: <span className="dynamic_span">{todayLow}°F</span>
<br />
<h3>Tomorrow's weather: </h3>
<span className="dynamic_span">{tomorrowWeather} {icons[2]}</span>  with a high of <span className="dynamic_span">{tomorrowHigh}°F </span> and low of <span className="dynamic_span">{tomorrowLow}°F </span>
<br /><br /><br />         
        </div>
    )
}

export default Weather 


