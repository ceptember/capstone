import { useDispatch, useSelector } from "react-redux"; 
import { storeUser } from './features/example/exampleSlice'
import { Link} from "react-router-dom";
import techtimeslogo from './techtimeslogo.PNG'

function Header({currentTemp, currentWeather, city, usState, handleLogout}){

    const userFromStore = useSelector((state) => state.user) //getting this from the store 
    const today = new Date()

    return (
        <div id="header_component">
            
            <div id="header-container1">
                <span id="header-searchbar"></span>Search bar 
                <span id= "header-login-logout"> 
                    {userFromStore ? <Link className='' to={"/login"}><button onClick={handleLogout}>log out </button></Link> : <Link className='' to={"/login"}><button> sign up / log in </button></Link>}   
                    <br />
                    {userFromStore ? "Welcome, " + userFromStore.username + "! " : ""} 
                </span>
            </div>
            <div id="header-container2">
                <div id="header-date">{today.toDateString()} </div>
                <div id="logo-container"><Link className='' to={"/"}> <img id="header_logo" src={techtimeslogo}></img> </Link></div>
                <div id="header-weather"> 
                    {currentTemp}°F and {currentWeather} in {city}, {usState}
                    <br />
                    <Link className='' to={"/weather"}> more weather </Link>
                </div>
            </div>
            <div id="header-container3">
                Nav bar of news categories
            </div>
            
          
          
            
        </div>
    )
}

export default Header; 
