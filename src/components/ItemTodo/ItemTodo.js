import React from "react";

class ItemTodo extends React.Component {
    render() {
        const { onToggleTodo, onDeleteTodo, indexTodo, element} = this.props;

        return (
        <li>
            <button onClick={() => onToggleTodo(indexTodo)}>
                I've Done Doing This !
                </button>
                <button onClick={() => onDeleteTodo(element)}>
                Delete
                </button>
            {this.props.isFinishedTodo?(
                <u>{this.props.text}</u>
            ) : (
                <i>{this.props.text}</i>
            )}
            </li>
        );
    }
}

export default ItemTodo;