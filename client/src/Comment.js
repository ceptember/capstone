import React from "react";
import {useEffect, useState} from 'react'


function Comment({comment_id}){

    const [commentObj, setCommentObj] = useState({})

    useEffect( ()=>{
        fetch('/comments/' + comment_id)
            .then( resp => resp.json() )
            .then (data => {
                setCommentObj(data)})
    }, [] )

    return(
        <div>
            {commentObj.comment_text ? commentObj.comment_text : "" }
            <br />
            ~{commentObj.user ? commentObj.user.username : "" }

        </div>
    )
}

export default Comment; 