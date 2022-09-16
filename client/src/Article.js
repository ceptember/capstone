import React from "react";
import {useState, useEffect} from "react"

import Comment from "./Comment";
import { Link} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"; 

function Article({article}){

    const [authors, setAuthors] = useState("")
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState(article.comments)


    const userFromStore = useSelector((state) => state.user) //getting this from the Redux store 

    const [commentError, setCommentError] = useState("")

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
            user_id: userFromStore.id,
            article_id: article.id,
            comment_text: newComment
        }

        fetch("/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentObj)
        })
            .then(resp => {
                if (resp.ok){
                    resp.json().then(data => {
                        setComments([...comments, data])
                        setCommentError("")
                    }) 
                }
                else {
                    setCommentError("invalid comment")
                }
                
            
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
        <div id="article_component"> 
            <h2>{article.headline}</h2>
            <h4>by {authors}</h4> 
            <h4>{article.date}</h4>

            <p className="publication_note">
                NOTE: This article was originally published on <a href="https://theconversation.com/" target="_blank">The Conversation 🡥</a> under the Creative Commons license, and is republished here per the <a href="https://theconversation.com/us/republishing-guidelines" target="_blank">republishing guidelines 🡥</a>.
            </p>


            {article.content.map( x => <p key={x}>{x}</p>)}
    
            <h3>Comments</h3> 

            {comments ? comments.map( x => <Comment key={x.id} comment_id={x.id} deleteComment={deleteComment} /> ) : ''}

            <h3>Post a Comment</h3> 
            <form onSubmit={e => handleSubmitComment(e)}>
                <textarea id="comment_textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                <br />
                { commentError ? commentError : ""}
                <br />
                { userFromStore  ? <input type="submit" className="submit_btn"></input> : <Link className='' to={"/login"}> log in to comment</Link>}
                <br />
            </form>

        </div>
    )
}

export default Article 