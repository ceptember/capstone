import ArticlePreview from "./ArticlePreview";
import {useEffect, useState} from 'react'
import Article from "./Article";

import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

function News(){

    const [articles, setArticles] = useState([])

    useEffect( ()=>{
        fetch('/articles')
        .then(resp => resp.json())
        .then(data => {
             console.log(data[0])   
            setArticles(data.reverse())})//Oldest first in db, Newest top of screen! 
    }, [])

    return (
        <div id="news_component" className="main_component_holder">
            <h1>Science and Technology News</h1>
            { articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 
            { articles.length > 0 ? articles.map( x => <ArticlePreview key={x.id} article={x} /> ) : ""} 

        </div>
    )

}

export default News; 