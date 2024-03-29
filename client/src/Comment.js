import React from "react";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import EditComment from "./EditComment";

function Comment({comment_id, deleteComment}){

    const [commentObj, setCommentObj] = useState({})
    const [commentUsername, setCommentUsername] = useState("")
    const [canEdit, setCanEdit] = useState(false)
    const [editing, setEditing] = useState(false)

    const userFromStore = useSelector((state) => state.user) 
  //  const [usernameFromStore, setUsernameFromStore] = null 
    const [username, setUsername] = useState("")
    
    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setUsername(data.username)
            }); 
          }
        });
      }, []);


    // get comments 
    useEffect( ()=>{
        fetch('/comments/' + comment_id)
            .then( resp => resp.json() )
            .then (data => {
                setCommentObj(data)
                setCommentUsername(data.user.username)
            })
    }, [] )

    function closeEditForm(){
        setEditing(false)
    }

    function handleEditComment(editedComment){
        setCommentObj(editedComment)
    }

    function handleDeleteComment(){
        deleteComment(comment_id)
        document.querySelector('#modal'+comment_id).style.display="none"
    }

    return(
        <div className="comment_box">

            {commentObj.comment_text ? commentObj.comment_text : "" }
            <br />
            -{ commentUsername }
            
            <p> 
              { commentUsername == username ? <button onClick={()=>setEditing(true)}>edit</button>: " " } 
              { commentUsername == username? <button onClick={ () => document.querySelector('#modal'+comment_id).style.display="block" } >delete</button>: " " }
            </p>
           { editing ? <EditComment comment={commentObj} closeEditForm={closeEditForm} handleEditComment={handleEditComment} /> : ""}

            {/* Confirm delete when button clicked */}
           <div className="delete-modal" id={"modal"+comment_id} >
                <div className="delete-modal-content">
                    <span className="close" onClick={ () => document.querySelector('#modal'+comment_id).style.display="none" }>&times;</span>
                    <p>"{commentObj.comment_text ? commentObj.comment_text : "" }"</p>
                    <p>Do you want to delete this comment?</p>
                    <button onClick={handleDeleteComment}>Delete</button><button onClick={ () => document.querySelector('#modal'+comment_id).style.display="none" }>Cancel</button>
                </div>
            </div>
       
        </div>
    )
}

export default Comment; 