import React from "react";
import {useState, useEffect} from "react"

import Comment from "./Comment";
import { Link} from "react-router-dom";


function Article({article}){

    const [authors, setAuthors] = useState("")
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState(article.comments)

    const [user, setUser] = useState(null); //this is duplicated, move to store 

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((data) => setUser(data));
        }
      });
    }, []);

    useEffect( ()=> {

        if (article.authors.length == 1){
            setAuthors(article.authors[0])
        }

        else if (article.authors.length == 2){
            setAuthors(article.authors[0] + " & " + article.authors[1])
        }

        else if (article.authors.length > 2){
            let authorsString = ""
            for (let i = 0; i < (article.authors.length - 1); i++){
                authorsString = authorsString + article.authors[i] + ", "
            }
            authorsString = authorsString + " and " + article.authors[article.authors.length-1]

            setAuthors(authorsString)
        }


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
            .then(data => {
                setComments([...comments, data])
            }) 
        setNewComment("")
    }

    function deleteComment(comment_id){
        
        fetch("/comments/"+comment_id,{
            method: "DELETE"
        })
        .then( () => {
            let otherComments = comments.filter( c => c.id != comment_id)
            setComments(otherComments)
        })

    }

    return (
        <div> 
            <h2>{article.headline}</h2>
            <h4>by {authors}</h4> 
            <h4>{article.date}</h4>
           
            <br />

            {article.content.map( x => <p key={x}>{x}</p>)}
    
            <h3>Comments</h3> 

            {comments ? comments.map( x => <Comment key={x.id} comment_id={x.id} deleteComment={deleteComment} /> ) : ''}

            
            <form onSubmit={e => handleSubmitComment(e)}>
                <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                { user  ? <input type="submit"></input> : <Link className='' to={"/login"}> log in to comment</Link>}
            </form>

        </div>
    )
}

export default Article 