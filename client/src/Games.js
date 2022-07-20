import React from "react";
import { useEffect, useState } from "react";

function Games(){

    const words = [{word: 'annoy', definition: 'to bother with unpleasant deeds'}, {word: 'ignore', definition: 'To deliberately not listen or pay attention to.'}, {word: 'prefer', definition: 'To be in the habit of choosing something rather than something else'},{word: 'attention', definition: 'Mental focus'}, {word: 'instead', definition: 'In the place of something'}, {word: 'problem', definition: 'A difficulty that has to be resolved or dealt with.'}, {word: 'investigate', definition: 'To examine, look into, or scrutinize in order to discover something hidden or secret'}, {word: 'protect', definition: 'To keep safe; to defend; to guard'},{word: 'comfortable', definition: 'Providing physical comfort and ease; agreeable.'}, {word: 'invite', definition: 'To ask for the presence or participation of someone or something.'},{word: 'proud', definition: 'Feeling honoured (by something); feeling happy or satisfied about an event or fact'}, {word: 'consequence', definition: 'A result of actions, especially if such a result is unwanted or unpleasant.'},{word: 'important', definition: 'Having relevant and crucial value.'},{word: 'question', definition: 'A sentence, phrase or word which asks for information, reply or response'},{word: 'curious', definition: 'Tending to ask questions, or to want to explore or investigate; inquisitive;'},{word: 'jealous', definition: 'Envious; feeling resentful or angered toward someone for a perceived advantage or success'},{word: 'remind', definition: 'To cause one to experience a memory'},{word: 'curve', definition: 'A gentle bend, such as in a road.'},{word: 'leader', definition: 'One having authority to direct'},{word: 'repeat', definition: 'To do or say again'},{word: 'decide', definition: 'to make a judgment, especially after deliberation'},{word: 'report', definition: 'To relate details of (an event or incident)'},{word: 'direction', definition: 'A theoretical line (physically or mentally) followed from a point of origin or towards a destination.'},{word: 'listen', definition: 'To pay attention to a sound or speech'},{word: 'rhyme', definition: 'Sameness of sound of part of some words.'},{word: 'discover', definition: 'To find or learn something for the first time.'},{word: 'lovely', definition: 'Beautiful; charming; very pleasing in form, looks, tone, or manner.'},{word: 'respect', definition: 'an attitude of consideration or high regard'},{word: 'measure', definition: 'To ascertain the quantity of'}]

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const [randomWordObj, setRandomWordObj] = useState({word: "", definition: ""})
    const [scrambledWord, setScrambledWord] = useState("")
    const [wordSearch, setWordSearch] = useState([])
    const [rowForSearch, setRowForSearch] = useState(null)
    const [indexForSearch, setIndexForSearch] = useState(null)


    // let x = 4 // i - 1 will get rid of the last; 0 will get rid of the first 


    useEffect( () => {
        setRandomWordObj(words[Math.floor(words.length * Math.random())])
    },[])

    // Scramble the word 
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
            Games! 
            <br /><br />
            SCRAMBLE 
            <br />
            word: {randomWordObj.word}           
            <br />
            scrabmled: {scrambledWord}
            <br /><br />

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

export default Games 

// {word: 'embarrass', definition: 'to humiliate'},{word: 'miserable', definition: 'very sad, ill, or poor.'},{word: 'special', definition: 'Distinguished by a unique or unusual quality.'},{word: 'enormous', definition: 'Extremely large'},{word: 'mumble', definition: 'To speak unintelligibly or inaudibly'},{word: 'spotless', definition: 'Exceptionally clean.'},{word: 'exhausted', definition: 'Very tired'},{word: 'negative', definition: 'Not positive nor neutral.'},{word: 'squirm', definition: 'To twist the body with snakelike motions'},{word: 'explore', definition: 'To examine or investigate something systematically.'},{word: 'nervous', definition: 'Apprehensive, anxious, hesitant, worried.'},{word: 'disappoint', definition: 'To sadden or displease (someone) by underperforming'}

// {word: 'arrange', definition: ''},
// {word: 'exercise', definition: ''},
// {word: 'slightly', definition: ''},
// {word: 'avoid', definition: ''},
// {word: 'expect', definition: ''},
// {word: 'cause', definition: ''},
// {word: 'famous', definition: ''},
// {word: 'classify', definition: ''},
// {word: 'flock', definition: ''},
// {word: 'predict', definition: ''},
// {word: 'community', definition: ''},
// {word: 'friendly', definition: ''},
// {word: 'prefer', definition: ''},
// {word: 'conclusion', definition: ''},
// {word: 'frighten', definition: ''},
// {word: 'process', definition: ''},
// {word: 'connection', definition: ''},
// {word: 'frown', definition: ''},
// {word: 'publish', definition: ''},
// {word: 'continue', definition: ''},
// {word: 'record', definition: ''},
// {word: 'cooperation', definition: ''},
// {word: 'gather', definition: ''},
// {word: 'revise', definition: ''},
// {word: 'curious', definition: ''},
// {word: 'separate', definition: ''},
// {word: 'cycle', definition: ''},
// {word: 'helpful', definition: ''},
// {word: 'steaming', definition: ''},
// {word: 'database', definition: ''},
// {word: 'include', definition: ''},
// {word: 'shiver', definition: ''},
// {word: 'describe', definition: ''},
// {word: 'insist', definition: ''},
// {word: 'similar', definition: ''},
// {word: 'detail', definition: ''},
// {word: 'investigate', definition: ''},
// {word: 'total', definition: ''},
// {word: 'diagram', definition: ''},
// {word: 'label', definition: ''},
// {word: 'suppose', definition: ''},
// {word: 'difference', definition: ''},
// {word: 'leaned', definition: ''},
// {word: 'different', definition: ''},
// {word: 'stormy', definition: ''},
// {word: 'discover', definition: ''},
// {word: 'march', definition: ''},
// {word: 'swoop', definition: ''},
// {word: 'drowsy', definition: ''},
// {word: 'matter', definition: ''},
// {word: 'treasure', definition: ''},
// {word: 'vanish', definition: ''},
// {word: 'effect', definition: ''},
// {word: 'volunteer', definition: ''},
// {word: 'event', definition: ''},
// {word: 'argue', definition: ''},
// {word: 'infer', definition: ''},
// {word: 'coastline', definition: ''},
// {word: 'credit', definition: ''},
// {word: 'culture', definition: ''},
// {word: 'prank', definition: ''},
// {word: 'elect', definition: ''},
// {word: 'occur', definition: ''},
// {word: 'marine', definition: ''},
// {word: 'ultimate', definition: ''},
// {word: 'repair', definition: ''},
// {word: 'signal', definition: ''},
// {word: 'slumber', definition: ''},
// {word: 'forest', definition: ''},
// {word: 'relax', definition: ''},
// {word: 'trace', definition: ''},
// {word: 'solution', definition: ''},
// {word: 'example', definition: ''},
// {word: 'attract', definition: ''},
// {word: 'purpose', definition: ''},
// {word: 'pleasant', definition: ''},
// {word: 'stomped', definition: ''},
// {word: 'nibble', definition: ''},
// {word: 'suddenly', definition: ''},
// {word: 'fascinating', definition: ''},
// {word: 'suggestion', definition: ''},
// {word: 'feast', definition: ''},
// {word: 'notice', definition: ''},
// {word: 'surprise', definition: ''},
// {word: 'focus', definition: ''},
// {word: 'observe', definition: ''},
// {word: 'uncomfortable', definition: ''},
// {word: 'frustrate', definition: ''},
// {word: 'opposite', definition: ''},
// {word: 'warning', definition: ''},
// {word: 'gigantic', definition: ''},
// {word: 'ordinary', definition: ''},
// {word: 'wonder', definition: ''},
// {word: 'grumpy', definition: ''},
// {word: 'positive', definition: ''},
// {word: 'worry', definition: ''},
// {word: 'precious', definition: ''},
// {word: 'amaze', definition: ''},
// {word: 'energy', definition: ''},
// {word: 'living', definition: ''},
// {word: 'amuse', definition: ''},
// {word: 'enormous', definition: ''},
// {word: 'toward', definition: ''},
// {word: 'analyze', definition: ''},
// {word: 'escape', definition: ''},
// {word: 'twilight', definition: ''},
// {word: 'estimate', definition: ''},
// {word: 'opinion', definition: ''},









 


