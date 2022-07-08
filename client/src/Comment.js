import React from "react";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"; 
import EditComment from "./EditComment";

function Comment({comment_id}){

    const [commentObj, setCommentObj] = useState({})
    const [commentUsername, setCommentUsername] = useState("")
    const [canEdit, setCanEdit] = useState(false)
    const [editing, setEditing] = useState(false)

    const userFromStore = useSelector((state) => state.user) //getting this from the store 
    const usernameFromStore = useSelector((state) => state.user.username)

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

    return(
        <div className="comment_box">
            {commentObj.comment_text ? commentObj.comment_text : "" }
            <br />
            ~{ commentUsername }
            <br /> 
            {/* <button onClick={submitLike}>Like</button> */}
            {/* <p>Current user from store: {usernameFromStore}</p> */}
            <p> { commentUsername == usernameFromStore ? <button onClick={()=>setEditing(true)}>edit</button>: " " } </p>
           { editing ? <EditComment comment={commentObj} closeEditForm={closeEditForm} handleEditComment={handleEditComment} /> : ""}
        </div>
    )
}

export default Comment; 