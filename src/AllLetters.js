//Renders the alphabet with it's font color

import React, {Component} from "react";
import "./AllLetters.css"

class AllLetters extends Component {
    constructor(props) {
        super(props);
        this.handleLetterClick = this.handleLetterClick.bind(this);
    }


    handleLetterClick(e) {
        this.props.clickFunction(this.props.letter)
    }

    render() {
        return (
            <p 
            className="AllLetters"
            style={{color: this.props.color}}
            onClick={this.handleLetterClick}>
                {this.props.letter}</p>
        );
    }
}

export default AllLetters