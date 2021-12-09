//Handles game elements such as choosing new wordCategory when selected

import React, {Component} from "react";
import Hangman from "./Hangman";
import Animals from "./Animals";
import Countries from "./Countries";
import Elements from "./Elements";
import LetterArray from "./LetterArray";


class GameHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCategory: Countries(),
        }
        this.animalsClicked = this.animalsClicked.bind(this);
        this.countriesClicked = this.countriesClicked.bind(this);
        this.elementsClicked = this.elementsClicked.bind(this);
    }

    //Update the category state for a new word and forces render to render before Hangman.js
    animalsClicked(e) {
        let category = this.state.wordCategory;
        category = Animals();
        this.setState({wordCategory: category});
        this.forceUpdate();
    }
    countriesClicked(e) {
        let category = this.state.wordCategory;
        category = Countries();
        this.setState({wordCategory: category});
        this.forceUpdate();
    }
    elementsClicked(e) {
        let category = this.state.wordCategory;
        category = Elements();
        this.setState({wordCategory: category});
        this.forceUpdate();
    }

    //Selects a random word from the category and calls the hangman component
    render () {
        let word = this.state.wordCategory[Math.floor(Math.random()*this.state.wordCategory.length)];
        let wordArray = word.split('')
        let letterArray = LetterArray(); 
        return (
            <Hangman 
            word={wordArray} 
            letterArray={letterArray}
            animalsClicked={this.animalsClicked}
            countriesClicked={this.countriesClicked}
            elementsClicked={this.elementsClicked} />
        );
    } 
}

export default GameHandler