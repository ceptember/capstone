import React from "react";
import {useState, useEffect} from "react"

import Comment from "./Comment";

function Article({article}){

    const [authors, setAuthors] = useState("")
    const [newComment, setNewComment] = useState("")

    const [user, setUser] = useState(null); //this is duplicated, move to store 

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((data) => setUser(data));
        }
      });
    }, []);


    useEffect( ()=>{
       
    }, [])
    
    function handleSubmitComment(e){
        e.preventDefault()
       

        let commentObj = {
            user_id: user.id,
            article_id: article.id,
            comment_text: newComment
        }

        fetch("/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentObj)
        })
            .then(resp => resp.json())
            .then(data => {})
        setNewComment("")
    }

    return (
        <div> 
            <h2>{article.headline}</h2>
            <h4>by {article.authors.map( a => a +", ")}</h4> 
           
            <br />

            {article.content.map( x => <p key={x}>{x}</p>)}
    
            <h3>Comments</h3> 

            {/* {article.comments ? article.comments.map( x => <p key={x.id}>{x.comment_text}  </p>  ) : ''} */}

            {article.comments ? article.comments.map( x => <Comment key={x.id} comment_id={x.id} /> ) : ''}


            <form onSubmit={e => handleSubmitComment(e)}>
                <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                <input type="submit"></input> user: {user ? user.username : ""}
            </form>

        </div>
    )
}

export default Article 