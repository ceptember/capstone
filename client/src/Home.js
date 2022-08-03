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
            // let firstArticles = data.filter((x,i) => i <= 5)
            // setArticles(firstArticles)
            setArticles(data)
        })
    }, [])

    
    return (
        <div id="home_component">
            <div class="headline_container">
                <div class="headline1">
                    {articles[0] ? articles[0].headline : ""}
                </div>
                <img class="headline1_img" src={placeholderImg} width="300px" height="200px"></img>
            </div>

             <div class="headline_container">
                <div class="headline2">{articles[1] ? articles[1].headline : ""}</div>
                <div class="headline2">{articles[2] ? articles[2].headline : ""}</div>
            </div>
           
            <div class="headline_container">
                <div class="headline2">{articles[3] ? articles[3].headline : ""}</div>
                <div class="headline2">{articles[4] ? articles[4].headline : ""}</div>
                <div class="headline2">{articles[5] ? articles[5].headline : ""}</div>
            </div>  
            
            {/* { articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 
            { articles.length > 0 ? articles.map( x => <ArticlePreview key={x.id} article={x} /> ) : ""} */}
            <Link to="/news">More News</Link> 
        </div>
    )
}

export default Home; 