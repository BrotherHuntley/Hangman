//Renders the alphabet with it's font color

import React, {Component} from "react";

class AllLetters extends Component {
    render() {
        return (
            <p style={{color: this.props.color}}>{this.props.letter}</p>
        );
    }
}

export default AllLetters