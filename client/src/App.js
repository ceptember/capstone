
import logo from './logo.svg';

import React from 'react'
import './App.css';
import Header from './Header';
import Home from './Home';
import About from './About';
import Login from './Login'; 
import Footer from './Footer';
import Article from './Article';
import { useEffect, useState } from 'react';

import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"; 

//Redux Action Creators
import { sayBoo } from './features/example/exampleSlice';

function App() {

  const [articles, setArticles] = useState([])

  useEffect( ()=>{
      fetch('/articles')
      .then(resp => resp.json())
      .then(data => {
           console.log(data[0])   
          setArticles(data)})
  }, [])


// Testing out the redux store 
  // read from the Redux store
  const items = useSelector((state) => state.items);
  const thing = useSelector((state) => state.myStateThing)

  const [user, setUser] = useState(null); //change to redux store 

  // gives us the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();



  function handleOnClick() {
    // dispatching an action on click
    dispatch(sayBoo("Boo!"));
  }

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data)); //add a dispach here 
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Project 5
      </header>

      <div>
        <h1> { user ? user.username : ""} </h1>
        <h1>FROM STORE:</h1>
      <button onClick={handleOnClick}>Click</button>
      <p>{thing}</p>
    </div>

    <Header />
    { articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 
    <Route exact path="/"> <Home />  </Route>
    <Route path="/login"> <Login />  </Route>
    <Route path="/about"><About /> </Route>
    <Footer />
    </div>
  );
}

export default App;
