import React from "react";
import {useEffect, useState} from "react"

function Wordsearch ({words}){

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const [randomWordObj, setRandomWordObj] = useState({word: "", definition: ""})
    const [wordSearch, setWordSearch] = useState([])
    const [rowForSearch, setRowForSearch] = useState(null)
    const [indexForSearch, setIndexForSearch] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState("")
    const [guessesLeft, setGuessesLeft] = useState(3)

    useEffect( () => {
        setRandomWordObj(words[Math.floor(words.length * Math.random())])
    },[words])

    // Create the word search 
    useEffect( ()=> {
        if (randomWordObj){
            const upper = randomWordObj.word.toUpperCase()
            const wordArray = upper.split("")
            const searchBoard = []

            // First fill in the board with random letters 
            for (let i = 0; i <= 8; i++){ //for each row, create a [] row, then the inner loop creates each cell
                let row = []; 
                for (let j = 0; j <= 12; j++){
                    row.push(alphabet[Math.floor(Math.random() * 26)])
                }
                //out of inner loop 
                searchBoard.push(row)
            }
            //out of both loops

            //Choose a row for the hidden word 
            let rowNumber = Math.floor(Math.random() * 8)
            setRowForSearch(rowNumber)
        //  let wordLetters = randomWordObj.word.split("")

            let startIndex = Math.floor(Math.random() * (14 - wordArray.length))
            setIndexForSearch(startIndex)

            let rowWithWord = [...searchBoard[rowNumber].slice(0, startIndex), ...wordArray,...searchBoard[rowNumber].slice(wordArray.length+startIndex)]

            let newBoard = [...searchBoard.slice(0, rowNumber), rowWithWord, ...searchBoard.slice(rowNumber+1)]
            
        setWordSearch(newBoard)

    }
    }, [randomWordObj])

    // CHECK THE GUESS 
    function wordSearchGuess(e, r, i){
        if(randomWordObj){
        let lastLetterIndex = indexForSearch+randomWordObj.word.length-1
        if ( r == rowForSearch && (indexForSearch <= i && i <= lastLetterIndex ) ){
            setGameOver(true)
            setWinner("You got it!")
           document.querySelector("#wordSearchTable").style.display = 'none'
        }
        else {
            if (guessesLeft > 1){
                setGuessesLeft(guessesLeft -1)
            }
            else {
                setGameOver(true)
                setWinner("Better luck next time!")
                document.querySelector("#wordSearchTable").style.display = 'none'
            }
        }
    }
    }

    function newGame(){
        document.querySelector("#wordSearchTable").style.display = 'table'
        window.location.reload(false)
    }

    return (
        <div >
            <h1>Word Search</h1>
            <h3>Find the hidden word in the puzzle</h3>
            <h2>Hint: {randomWordObj ? randomWordObj.definition : ""}</h2>
            
            <table id="wordSearchTable">
                <tr> { wordSearch[0] ? wordSearch[0].map( (x, i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 0, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[1] ? wordSearch[1].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 1, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[2] ? wordSearch[2].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 2, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[3] ? wordSearch[3].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 3, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[4] ? wordSearch[4].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 4, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[5] ? wordSearch[5].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 5, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[6] ? wordSearch[6].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 6, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[7] ? wordSearch[7].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 7, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[8] ? wordSearch[8].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 8, i)}>{x}</td>) : "" } </tr>
                
           </table>
           <br />
            {gameOver ? <h1>{randomWordObj.word.toUpperCase()}</h1> : ""}
            {gameOver ? <h2>{winner}</h2> : ""}
            {gameOver ? "" : <h2>Guesses left: {guessesLeft}</h2>}
            
            <br />
            {gameOver ? <button className="new_game" onClick={newGame}>New Game</button> : ""}
            


        </div>
    )
}

export default Wordsearch