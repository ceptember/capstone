import ArticlePreview from "./ArticlePreview";
import {useEffect, useState} from 'react'
import Article from "./Article";

import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

import fisheyeCity from "./fisheye_city.png"

function Home(){

    const [articles, setArticles] = useState([])

    const placeholderImg = "https://images.unsplash.com/photo-1595452767427-0905ad9b036d"
    const frontPageImg = "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4"

    useEffect( ()=>{
        fetch('/articles')
        .then(resp => resp.json())
        .then(data => {
            setArticles(data.reverse()) //Oldest first in db, Newest top of screen! 
        })
    }, [])

    
    return (
        <div id="home_component" className="main_component_holder">
        <h1>Today's Science and Technology Headlines</h1>
        <div className="headlines_and_img">
            <div className="headline_container_vertical">
                    <div className="headline1">
                        <h2>{articles[0] ? articles[0].headline : ""}</h2>
            
                        <p>
                            {articles[0] ? articles[0].content[0] : ""}. {articles[0] ? articles[0].content[1] : ""}...
                            {articles[0] ? <Link className="body_link" to={"/articles/"+articles[0].id}>see more</Link> : ""}
                        </p>
                    </div>

                    <div className="headline2">
                        <h3>{articles[1] ? articles[1].headline : ""}</h3>
                        <p>
                            {articles[1] ? articles[1].content[0] : ""} {articles[1] ? articles[1].content[1] : ""}...
                            {articles[1] ? <Link className="body_link" to={"/articles/"+articles[1].id}>see more</Link> : ""}
                        </p>
                    </div>
    

            </div>
            <div className="home_img_holder">
                <img className="headline1_img" src={fisheyeCity} ></img>
                
                <p>image credit: Joshua Rawson-Harris on <a href="https://unsplash.com/photos/KRELIShKxTM" target="_blank">Unsplash</a></p>
            </div>
        </div>

           
            <div className="headline_container">
            <div className="headline_style_2">
                <h3>{articles[2] ? articles[2].headline : ""}</h3>
                <p>   
                    {articles[2] ? articles[2].content[0] : ""} ...
                    {articles[2] ? <Link className="body_link" to={"/articles/"+articles[2].id}>see more</Link> : ""}
                </p>
            </div>

            <div className="headline_style_2">
            <h3>{articles[3] ? articles[3].headline : ""}</h3>
            <p>   
                {articles[3] ? articles[3].content[0] : ""} ...
                {articles[3] ? <Link className="body_link" to={"/articles/"+articles[3].id}>see more</Link> : ""}
            </p>
            </div>

            <div className="headline_style_2">
            <h3>{articles[4] ? articles[4].headline : ""}</h3>
            <p>   
                {articles[4] ? articles[4].content[0] : ""} ...
                {articles[4] ? <Link className="body_link" to={"/articles/"+articles[4].id}>see more</Link> : ""}
            </p>
            </div>  
            </div>

            <div className="more_news">
                <Link to="/news">More News</Link> 
            </div>  
            
            
        </div>
    )
}

export default Home; 

