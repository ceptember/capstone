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
            setArticles(data)})
    }, [])

    return (
        <div id="news_component">
            
            { articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 
            { articles.length > 0 ? articles.map( x => <ArticlePreview key={x.id} article={x} /> ) : ""} 

        </div>
    )

}

export default News; 