import ArticlePreview from "./ArticlePreview";
import {useEffect, useState} from 'react'
import Article from "./Article";

import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

function Home(){

    const [articles, setArticles] = useState([])

    const placeholderImg = "https://images.unsplash.com/photo-1595452767427-0905ad9b036d"

    useEffect( ()=>{
        fetch('/articles')
        .then(resp => resp.json())
        .then(data => {
            setArticles(data)
        })
    }, [])

    
    return (
        <div id="home_component" class="main_component_holder">

        <div class="headlines_and_img">
            <div class="headline_container_vertical">
                    <div class="headline1">
                        <h2>{articles[0] ? articles[0].headline : ""}</h2>
            
                        <p>
                            {articles[0] ? articles[0].content[0] : ""}. {articles[0] ? articles[0].content[1] : ""}...
                            {articles[0] ? <Link className="body_link" to={"/articles/"+articles[0].id}>see more</Link> : ""}
                        </p>
                    </div>

                    <div class="headline2">
                        <h3>{articles[1] ? articles[1].headline : ""}</h3>
                        <p>
                            {articles[1] ? articles[1].content[0] : ""} {articles[1] ? articles[1].content[1] : ""}...
                            {articles[1] ? <Link className="body_link" to={"/articles/"+articles[1].id}>see more</Link> : ""}
                        </p>
                    </div>
    

            </div>
            <div className="home_img_holder">
                <img className="headline1_img" src={placeholderImg} ></img>
            </div>
        </div>

      
           
            <div class="headline_container">
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

            <div class="more_news">
                <Link to="/news">More News</Link> 
            </div>  
            
            
        </div>
    )
}

export default Home; 

