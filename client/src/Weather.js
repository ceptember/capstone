import React from "react";
import {useState, useEffect} from 'react'

function Weather(){

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

    function handleGeo(){

    }

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
                console.log(weatherData)
                //get weather 
                let weathercodesNowTodayTomorrow = [weatherData.current_weather.weathercode, weatherData.daily.weathercode[0], weatherData.daily.weathercode[1]]
                let nowTodayTomorrow = []; 
                for (let x of weathercodesNowTodayTomorrow){
                    if ([0, 1, 2].includes(x)){
                        nowTodayTomorrow.push('clear'); 
                    }
                    else if ([3, 45, 48].includes(x)){
                        nowTodayTomorrow.push('cloudy'); 
                    }
                    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(x)){
                        nowTodayTomorrow.push('rain'); 
                    }
                    else if ([71, 73, 75, 77, 85, 86].includes(x)){
                        nowTodayTomorrow.push('snow'); 
                    }
                }
                setCurrentWeather(nowTodayTomorrow[0]); 
                setTodayWeather(nowTodayTomorrow[1]); 
                setTomorrowWeather(nowTodayTomorrow[2]); 

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

    function handleSearchCity(){
      //  setSearchZip(e.target.value)
        console.log("!")

    }

    function handleSearchZip(e){
        e.preventDefault()
        setZipcode(searchZip)
        setUrlGeo(`https://geocoding-api.open-meteo.com/v1/search?name=${searchZip}`)
        setSearchZip("")
    }

    function checkZip(){

    }

//use this to search by city 
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=100
    return(
        <div>
            Weather Page
            <br />
            Search 
            <br />
            Search by Zipcode
        
            <form onSubmit={handleSearchZip}> 
                <input value={searchZip} onChange={(e) => setSearchZip(e.target.value)}></input>
                <input type="submit"></input>
            </form>
            Search by U.S. city name 
            <form> 
                <input onChange={ (e) => listCities(e)} ></input>
            </form>
            {cityName}
            { cityResults ? cityResults.map( x => <li key={x.id}> {x.name}, {x.admin1} { x.postcodes[0] } <button onClick={ () => setUrlGeo(`https://geocoding-api.open-meteo.com/v1/search?name=${x.postcodes[0]}`)} >search {x.postcodes[0]}</button> </li>) : ""}


            <br />
            Showing data for {city}, {usState}, {zipcode}, lat {lat}, long {long}. 
            <br />
            
Current Temperature is {currentTemp}°F
<br />
{currentWeather} right now, and {todayWeather} most of the day
<br />

Today's high: {todayHigh}°F; Today's low: {todayLow}°F
<br />
Tomorrow's weather: {tomorrowWeather} with a high of {tomorrowHigh}°F and low of {tomorrowLow}°F 


            
         
        </div>
    )
}

export default Weather 


