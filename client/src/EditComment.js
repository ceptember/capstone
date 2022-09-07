import React from "react";
import {useState, useEffect} from 'react'; 

function EditComment({comment, closeEditForm, handleEditComment}){

    const [commentText, setCommentText] = useState(comment.comment_text)
    

    function submitEdit(e){
        e.preventDefault()

        const editedComment = {
            comment_text: commentText
        }
        
        fetch("/comments/"+comment.id,{
            method: "PATCH", 
            headers:  {"Content-Type": "application/json"},
            body: JSON.stringify(editedComment)
        })
        .then(resp => resp.json())
        .then(data => {
            handleEditComment(data)
        })

        closeEditForm()

    }

    function cancelEdit(){
        closeEditForm()
    }

    return(
        <div>
            <form onSubmit={ e => submitEdit(e)}> 
                {/* <input value={comment.comment_text ? comment.comment_text : ""}></input> */}
                <input value={commentText} className="comment_edit_box" onChange={(e)=> setCommentText(e.target.value)}></input>
                <br />
                <input type="submit" className="submit_btn"></input>
                <button onClick={cancelEdit}> Cancel </button>
            </form>
            
        </div>
    )
}

export default EditComment