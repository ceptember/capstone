import ArticlePreview from "./ArticlePreview";
import {useEffect, useState} from 'react'
import Article from "./Article";

import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";



function Home(){

    const [articles, setArticles] = useState([])

    useEffect( ()=>{
        fetch('/articles')
        .then(resp => resp.json())
        .then(data => {
             console.log(data[0])   
            setArticles(data)})
    }, [])


    return (
        <div>

{ articles.length > 0 ? articles.map( (x) =>  <Route path={"/articles/"+x.id} key={x.id} > <Article article={x}  /></Route>) : ""} 


            The home page will dynamically generate previews of that day's articles. 
           
           

               { articles.length > 0 ? articles.map( x => <ArticlePreview key={x.id} article={x} /> ) : ""} 

            <p>Also have cards with links to games </p>
        </div>
    )
}

export default Home; 