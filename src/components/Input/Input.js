import React from "react";
import style from "../Input/Input.module.css";

class Input extends React.Component {
    render() {
        return (
        <input
        type="text"
        value={this.props.val}
        onChange={this.props.onInputChanged}
        onKeyDown={this.props.onKeyPressed}
        />
    );
    }
}

export default Input;