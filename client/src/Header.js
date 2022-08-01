import { useDispatch, useSelector } from "react-redux"; 
import { storeUser } from './features/example/exampleSlice'
import { Link} from "react-router-dom";

function Header({currentTemp, currentWeather, city, usState}){

    const userFromStore = useSelector((state) => state.user) //getting this from the store 
    const today = new Date()

    return (
        <div id="header_component">
            
            <p id= "header-login-logout"> {userFromStore ? "Welcome, " + userFromStore.username + "! " : <button>Sign Up / Log in </button>}  </p>
            <span>{today.toDateString()}| </span>
            <span> Weather | </span>
            <span> Search bar </span>
            <Link className='' to={"/"}> <h1>The Tech Times</h1> </Link>
            {currentTemp}°F and {currentWeather} in {city}, {usState}
            <br />
            <Link className='' to={"/weather"}> more weather </Link>
            
            <div> Nav bar of news categories </div>
            
        </div>
    )
}

export default Header; 
