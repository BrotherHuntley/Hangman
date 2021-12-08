import React, {Component} from "react";
import './Letter.css'

class Letter extends Component {
    render() {
        return (
            <div className="Letter">{this.props.letter}</div>
        );
    }
}

export default Letter