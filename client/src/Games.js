import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Scramble from "./Scramble";
import Wordsearch from "./Wordsearch";
import { Link} from "react-router-dom";

import wordsearchimg from "./wordsearchimg.PNG"
import scrambleimg from "./scrambleimg.PNG"

function Games(){

    // const words = [{word: 'annoy', definition: 'to bother with unpleasant deeds'}, {word: 'ignore', definition: 'To deliberately not listen or pay attention to.'}, {word: 'prefer', definition: 'To be in the habit of choosing something rather than something else'},{word: 'attention', definition: 'Mental focus'}, {word: 'instead', definition: 'In the place of something'}, {word: 'problem', definition: 'A difficulty that has to be resolved or dealt with.'}, {word: 'investigate', definition: 'To examine, look into, or scrutinize in order to discover something hidden or secret'}, {word: 'protect', definition: 'To keep safe; to defend; to guard'},{word: 'comfortable', definition: 'Providing physical comfort and ease; agreeable.'}, {word: 'invite', definition: 'To ask for the presence or participation of someone or something.'},{word: 'proud', definition: 'Feeling honoured (by something); feeling happy or satisfied about an event or fact'}, {word: 'consequence', definition: 'A result of actions, especially if such a result is unwanted or unpleasant.'},{word: 'important', definition: 'Having relevant and crucial value.'},{word: 'question', definition: 'A sentence, phrase or word which asks for information, reply or response'},{word: 'curious', definition: 'Tending to ask questions, or to want to explore or investigate; inquisitive;'},{word: 'jealous', definition: 'Envious; feeling resentful or angered toward someone for a perceived advantage or success'},{word: 'remind', definition: 'To cause one to experience a memory'},{word: 'curve', definition: 'A gentle bend, such as in a road.'},{word: 'leader', definition: 'One having authority to direct'},{word: 'repeat', definition: 'To do or say again'},{word: 'decide', definition: 'to make a judgment, especially after deliberation'},{word: 'report', definition: 'To relate details of (an event or incident)'},{word: 'direction', definition: 'A theoretical line (physically or mentally) followed from a point of origin or towards a destination.'},{word: 'listen', definition: 'To pay attention to a sound or speech'},{word: 'rhyme', definition: 'Sameness of sound of part of some words.'},{word: 'discover', definition: 'To find or learn something for the first time.'},{word: 'lovely', definition: 'Beautiful; charming; very pleasing in form, looks, tone, or manner.'},{word: 'respect', definition: 'an attitude of consideration or high regard'},{word: 'measure', definition: 'To ascertain the quantity of'}]
    
    const [words, setWords] = useState([])

    //move the above words to a seeded db table and model with GET route 
    // useEffect to fetch the words and useState to set const words 

    useEffect( ()=>{
        fetch('/game_words')
        .then(resp => resp.json())
        .then(data => { 
            console.log(data[0].definition)
            setWords(data)
            }) 
    }, [])



    return (
        <div className="main_component_holder">
            <Link to={"/games/"}> <h1>Games</h1> </Link>
            <br />


            <Route exact path="/games/"> 
                <div id="games_links_holder">
                <Link to={"/games/wordsearch"}> 
                    <div  className="game_card">
                        <img src={wordsearchimg} width='150px' height='80px'></img>
                        <br />Word Search     
                    </div> 
                </Link>
                <Link to={"/games/scramble"}> 
                    <div className="game_card">
                    <img src={scrambleimg} width='150px' height='80px'></img>
                    <br />Scramble
                    </div>
                </Link>
                </div>
                <br />
            </Route>
            <Route path="/games/scramble"><Scramble words={words}/></Route>
            <Route path="/games/wordsearch"><Wordsearch words={words}/></Route>

        </div>
    )
}

export default Games 










 


