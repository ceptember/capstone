import React from "react";
import {useEffect, useState} from "react"

function Wordsearch ({words}){

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const [randomWordObj, setRandomWordObj] = useState({word: "", definition: ""})
    const [wordSearch, setWordSearch] = useState([])
    const [rowForSearch, setRowForSearch] = useState(null)
    const [indexForSearch, setIndexForSearch] = useState(null)

    useEffect( () => {
        setRandomWordObj(words[Math.floor(words.length * Math.random())])
    },[])

    // Create the word search 
    useEffect( ()=> {
        const wordArray = randomWordObj.word.split("")
        const searchBoard = []

        // First fill in the board with random letters 
        for (let i = 0; i <= 12; i++){ //for each row, create a [] row, then the inner loop creates each cell
            let row = []; 
            for (let j = 0; j <= 12; j++){
                row.push(alphabet[Math.floor(Math.random() * 26)])
            }
            //out of inner loop 
            searchBoard.push(row)
        }
        //out of both loops

        //Choose a row for the hidden word 
        let rowNumber = Math.floor(Math.random() * 12)
        setRowForSearch(rowNumber)
        let wordLetters = randomWordObj.word.split("")

        let startIndex = Math.floor(Math.random() * (14 - wordLetters.length))
        setIndexForSearch(startIndex)

        let rowWithWord = [...searchBoard[rowNumber].slice(0, startIndex), ...wordLetters,...searchBoard[rowNumber].slice(wordLetters.length+startIndex)]

        let newBoard = [...searchBoard.slice(0, rowNumber), rowWithWord, ...searchBoard.slice(rowNumber+1)]
        
      console.log(newBoard)
      setWordSearch(newBoard)

    }, [randomWordObj])

    function wordSearchGuess(e, r, i){
        let lastLetterIndex = indexForSearch+randomWordObj.word.length-1
        console.log("clicked " + r + ", " + i )
        console.log("answer: " + rowForSearch + ", " + indexForSearch + " thru " + (lastLetterIndex))
        if ( r == rowForSearch && (indexForSearch <= i && i <= lastLetterIndex ) ){
            console.log("correct!")
        }
        else {
            console.log("nope.")
        }
    }



    return (
        <div>
            word search! 
            SEARCHWORD
            <br />
            Hint: {randomWordObj.definition}
            <table>
                <tr> { wordSearch[0] ? wordSearch[0].map( (x, i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 0, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[1] ? wordSearch[1].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 1, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[2] ? wordSearch[2].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 2, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[3] ? wordSearch[3].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 3, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[4] ? wordSearch[4].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 4, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[5] ? wordSearch[5].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 5, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[6] ? wordSearch[6].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 6, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[7] ? wordSearch[7].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 7, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[8] ? wordSearch[8].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 8, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[9] ? wordSearch[9].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 9, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[10] ? wordSearch[10].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 10, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[11] ? wordSearch[11].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 11, i)}>{x}</td>) : "" } </tr>
                <tr> { wordSearch[12] ? wordSearch[12].map( (x,i) => <td key={i} onClick={ (e, row, index) => wordSearchGuess(e, 12, i)}>{x}</td>) : "" } </tr>
            </table>
        </div>
    )
}

export default Wordsearch