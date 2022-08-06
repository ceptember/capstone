import React from "react";
import {useEffect, useState} from "react"; 

function Scramble({words}){

    const [randomWordObj, setRandomWordObj] = useState({word: "", definition: ""})
    const [scrambledWord, setScrambledWord] = useState("")
    const [gameOver, setGameOver] = useState(false)
    const [guessesLeft, setGuessesLeft] = useState(5)
    const [wordGuess, setWordGuess] = useState("")
    const [guesses, setGuesses] = useState([])
    const [testThing, setTestThing] = useState([])
    const [winner, setWinner] = useState("you lose")

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

    function guessWord(e){
        e.preventDefault()
        // Set up the display of guesses 
        let lettersArray = []
        let guess = wordGuess
        for (let i=0; i < guess.length; i++){
            if (guess[i] == randomWordObj.word[i] ){
                lettersArray.push(<div className="scramble_letter scramble_letter_correct">{guess[i]}</div>)
            }
            else if (!randomWordObj.word.split("").includes(guess[i])){
                lettersArray.push(<div className="scramble_letter">{guess[i]}</div>)
            }
            else {
                lettersArray.push(<div className="scramble_letter scramble_letter_warm">{guess[i]}</div>) 
            }
        }
        let testArray=testThing
        testArray.push(lettersArray)
        setTestThing(testArray) 

        //CHECK THE ANSWER 
            if (wordGuess == randomWordObj.word){
                console.log("correct")
                setGameOver(true)
                setWinner("You Win!")
            }
            else {
                console.log("no")
            }

            setGuessesLeft(guessesLeft-1)
            setWordGuess("")

            if (guessesLeft <= 1){
                setGameOver(true)
                
            }
            
    }


    return(
        <div id="scramble_component">
              <h2>  SCRAMBLE </h2>
            
            <h4>Unscramble the word: </h4>        
          
             <h1>{scrambledWord}</h1>
        
            <form onSubmit={ (e) => guessWord(e)}>
                <input type="text" value={wordGuess} onChange={ (e)=> setWordGuess(e.target.value)}></input>      
                {gameOver? "" : <input type="submit"></input>}
            </form>
            
            {gameOver? "" : guessesLeft + " guesses remaining"}
           <br />
            
            {gameOver ? <h2>{winner}</h2>: ""}
            {gameOver ? <h2>solution: {randomWordObj.word}</h2>: ""}
            {gameOver? <button className="new_game" onClick={() => window.location.reload(false)}>New Game</button> : ""}
            <br /><br />
            <div id="guess_holder">
                <div class="guess">{testThing[0] ? testThing[0].map( x => x) : ""}</div>
                < br /> <br /><br />
                <div class="guess">{testThing[1] ? testThing[1].map( x => x) : ""}</div>
                < br /> <br /><br />
                <div class="guess">{testThing[2] ? testThing[2].map( x => x) : ""}</div>
                < br /> <br /><br />
                <div class="guess">{testThing[3] ? testThing[3].map( x => x) : ""}</div>
                < br /> <br /><br />
                <div class="guess">{testThing[4] ? testThing[4].map( x => x) : ""}</div>
            </div>
        </div>

    )
}

export default Scramble

