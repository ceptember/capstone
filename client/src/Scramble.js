import React from "react";
import {useEffect, useState} from "react"; 

function Scramble({words}){

    const [randomWordObj, setRandomWordObj] = useState({word: "", definition: ""})
    const [scrambledWord, setScrambledWord] = useState("")

    useEffect( () => {
        setRandomWordObj(words[Math.floor(words.length * Math.random())])
    },[])

    useEffect( ()=> {
        let scrambled = []
        let remaining = randomWordObj.word.split("") 

        for (let i = 0; i < randomWordObj.word.length; i++){
            let randomIndex = Math.floor(Math.random() * remaining.length)
            let randomLetter = remaining[randomIndex]
            scrambled.push(randomLetter)
           
            let previous = [...remaining]
            remaining = [...previous.slice(0,randomIndex), ...previous.slice(randomIndex+1)]
        }
        setScrambledWord(scrambled.join(""))

    }, [randomWordObj])


    return(
        <div>
                SCRAMBLE 
            <br />
            word: {randomWordObj.word}           
            <br />
            scrabmled: {scrambledWord}
            <br /><br />
        </div>
    )
}

export default Scramble