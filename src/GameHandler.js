import React, {Component} from "react";
import Hangman from "./Hangman";
import Countries from "./Countries";
import Animals from "./Animals";
import LetterArray from "./LetterArray";


class GameHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: Countries(),

        }
        this.countriesClicked = this.countriesClicked.bind(this);
        this.animalsClicked = this.animalsClicked.bind(this);
    }

    countriesClicked(e) {
        let wordsArray = this.state.words;
        wordsArray = Countries();
        this.setState({words: wordsArray});
        this.forceUpdate();
    }
    animalsClicked(e) {
        let wordsArray = this.state.words;
        wordsArray = Animals();
        this.setState({words: wordsArray});
        this.forceUpdate();
    }

    render () {
        let word = this.state.words[Math.floor(Math.random()*this.state.words.length)];
        let wordArray = word.split('')
        let letterArray = LetterArray(); 
        return (
            <Hangman 
            word={wordArray} 
            letterArray={letterArray}
            countriesClicked={this.countriesClicked}
            animalsClicked={this.animalsClicked}/>
        );
    } 
}

export default GameHandler