import React, {Component} from "react";
import './AllLetters.css'

class AllLetters extends Component {
    render() {
        return (
            <p style={{color: this.props.color}}>{this.props.letter}</p>
        );
    }
}

export default AllLetters