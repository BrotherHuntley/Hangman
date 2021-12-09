//Handles the current state of the game, keeping track of current misses and successes

import React, {Component} from "react";
import './Hangman.css'
import Letter from "./Letter";
import AllLetters from "./AllLetters";

class Hangman extends Component {
    constructor(props) {
        super(props);   
        this.state = { 
            wrongCount: 0,
            LettersArray: this.props.letterArray,
            correct: new Array(this.props.word.length).fill(false),
            LettersShown: new Array(this.props.word.length).fill(' ')
        }        
        this.handleKey = this.handleKey.bind(this);
        this.resetFunction = this.resetFunction.bind(this);
        this.clickAnimals = this.clickAnimals.bind(this);
        this.clickCountries = this.clickCountries.bind(this);
        this.clickElements = this.clickElements.bind(this);
    }

    //Triggers when new key is pressed. Checks if key is letter. Checks if the letter has been pressed already.
    //Checks if the letter is in given word. Updates the state for letter and the "score"
    handleKey(e) {
        if (e.keyCode >= 65 && e.keyCode <= 90) { //if key is a letter
            let isLetter = false;
            
            for (let i = 0; i < this.props.word.length; i++){ //iterate over every letter in word
                let curLetter = this.props.word[i];

                if (e.key.toLowerCase() === curLetter.toLowerCase()) { //if the letter exists in the word
                    //Reveal correct letter
                    let currentShown = this.state.LettersShown;
                    currentShown.splice(i,1,this.props.word[i])
                    this.setState({LettersShown: currentShown})

                    //Update "truth" array
                    let currentCorrect = this.state.correct;
                    currentCorrect.splice(i,1,true);
                    this.setState({correct: currentCorrect});
                     
                    //Color correct letter green
                    let curIndex = e.key.toLowerCase().charCodeAt(0)-97;
                    let LetterArray = this.state.LettersArray;
                    LetterArray.splice(curIndex,1,[e.key.toLowerCase(), 'Green'])
                    this.setState({LettersArray: LetterArray});

                    isLetter =true;

                    if (!currentCorrect.includes(false)) { alert('You Win!!!') } //if game is won, alert
                }
            }

            if (!isLetter) { //if guessed letter is wrong
                let LetterArray = this.state.LettersArray;
                let curIndex = LetterArray.findIndex(element => element.includes(e.key));
                
                if (!LetterArray[curIndex].includes('Red')) { //if guessed letter hasn't been previously guessed
                    //Color wrong letter red
                    LetterArray.splice(curIndex,1,[e.key.toLowerCase(), 'Red'])
                    this.setState({LettersArray: LetterArray});  

                    //Update the amount of wrong guesses
                    let curWrongCount = this.state.wrongCount;
                    this.setState({wrongCount: curWrongCount+1});
                    let lossStatement = 'You Lose... The word was ' + this.props.word.join("");
                    if (curWrongCount === 6) {
                        alert(lossStatement)
                    }
                }  
            }
        }
    }

    //Called when the new category button is clicked. Calls function from GameHandler.js to retrieve new word.
    //Waits for GameHandler.js to render before continuing to render
    clickCountries(e) {
        this.props.countriesClicked();
        setTimeout(() => {this.resetFunction()}, 1)
    }
    clickAnimals(e) {
        this.props.animalsClicked();
        setTimeout(() => {this.resetFunction()}, 1)
    }
    clickElements(e) {
        this.props.elementsClicked();
        setTimeout(() => {this.resetFunction()}, 1)
    }

    //Resets to base game stats when a new category is chosen
    resetFunction() {        
        this.setState({wrongCount: 0});
        this.setState({LettersArray: this.props.letterArray});
        this.setState({correct: new Array(this.props.word.length).fill(false)});
        this.setState({LettersShown: new Array(this.props.word.length).fill(' ')});
    }

    render() {
        //Renders the hidden word by letter
        let letters = this.state.LettersShown.map((n, i) => (
            <Letter key={i} letter={n}/>));
        
        //Renders the alphabet with the colors of each letter depending on guessed state
        let LetterArray = this.state.LettersArray;
        let allLetters = LetterArray.map((n,i) => 
            <AllLetters key={i} letter={n[0]} color={n[1]}/>)
        
        //Creates array for rendering the hangman
        let hangmanArray = [
            <div className="Hangman-Gallows">
                <div className="Hangman-Gallows1"></div>
                <div className="Hangman-Gallows2"></div>
                <div className="Hangman-Gallows3"></div>
            </div>,
            <div className="Hangman-Head"></div>,
            <div className="Hangman-Body"></div>,
            <div className="Hangman-LArm"></div>,
            <div className="Hangman-RArm"></div>,
            <div className="Hangman-LLeg"></div>,
            <div className="Hangman-RLeg"></div>,
        ]

        return (
            <div className="Hangman">
                <h1 className="Hangman-h1">Hangman</h1>
                <div className="Hangman-buttons">
                    <p style={{color: "white"}}>New Game:</p>   
                    <button onClick={this.clickAnimals}>Animals</button>
                    <button onClick={this.clickCountries}>Countries</button>
                    <button onClick={this.clickElements}>Elements</button>
                </div>
                <div className="Hangman-allLetters">{allLetters}</div>
                <input 
                    type="text"
                    className="Hangman-input"
                    maxLength="0"
                    onKeyUp={this.handleKey}
                />
                <div className="Hangman-guessed">{letters}</div>
                <div className="Hangman-man">
                    {hangmanArray.slice(0,this.state.wrongCount)}
                </div>
            </div>
            
        );
    }
}

export default Hangman