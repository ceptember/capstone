import React from "react";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"; 


function Comment({comment_id}){

    const [commentObj, setCommentObj] = useState({})

    useEffect( ()=>{
        fetch('/comments/' + comment_id)
            .then( resp => resp.json() )
            .then (data => {
                setCommentObj(data)})
    }, [] )
  
    // function submitLike(){

    //     let patchObj = {
    //        // likes: [...commentObj.likes, "placeholder user"]
    //        //comment_text: "blahhh"
    //        likes: ["blah"]
    //     }

    //     fetch("/comments/"+commentObj.id, { 
    //         method: "PATCH",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(patchObj)
    //     })
    //         .then(resp => resp.json())
    //         .then(data => console.log(data.likes))
    // }

    return(
        <div className="comment_box">
            {commentObj.comment_text ? commentObj.comment_text : "" }
            <br />
            ~{commentObj.user ? commentObj.user.username : "" }
            <br /> 
            {/* <button onClick={submitLike}>Like</button> */}
        </div>
    )
}

export default Comment; 