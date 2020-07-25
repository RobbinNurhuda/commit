import React from "react";
import ItemTodo from "../ItemTodo/ItemTodo";

class ListTodo extends React.Component {
    render() {
        const ListToRender = this.props.ListToRender;
        return (
            <ol>
                {ListToRender.map((element, index) => {
                    return (
                    <ItemTodo 
                    key={index}
                    text={element.todoText}
                    onToggleTodo={this.props.onToggleItem}
                    isFinishedTodo={element.isFinished}
                    onDeleteTodo={this.props.onTodoDelete}
                    element={element}
                    indexTodo={index}
                    />
                );
            })}
            </ol>
        );
    }
}

export default ListTodo;