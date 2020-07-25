import React from 'react';
import Input from './components/Input/Input';
import ListTodo from './components/ListTodo/ListTodo';
import FilterTodo from './components/FilterTodo/FilterTodo';
import { ambilDataDariServer, tambahDataKeserver, updateDataDiServer, deleteDataDiServer } from "./Service/TodoService";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputText: '',
      todoList: [],
      activeFilter: "ALL",
    };
  }

  componentDidMount(){
    // ambil datanya disini.. terus update state
    ambilDataDariServer().then((response) => {
      const data = response.data;
      const parsedData = data.map((element) =>{
        return {
          isFinished: element.isDone,
          todoText: element.text,
          id: element.id,
        };
      });

      this.setState({
        todoList: parsedData,
      });
    });
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  handleKeyPressed = (event) => {
    if (event.keyCode === 13) {
      const oldTodoList = this.state.todoList;
      const inputText = this.state.inputText;
      // Tambah Data Ke Server
      tambahDataKeserver({
        isDone: false,
        text: inputText,
      });


      oldTodoList.push({
        isFinished: false,
        todoText: inputText,
      });
      
      this.setState({
        todoList: oldTodoList,
      });
      console.log(oldTodoList);
    }
  };

  handleToggleDone = (index) => {
    const currentTodoList = this.state.todoList;
    const todoItem = currentTodoList[index];

    // Ubah value di Server
    const {id, isFinished, todoText} = todoItem;
    updateDataDiServer(id, {
      isDone: !isFinished,
      text: todoText,
    });

    // Ubah value di local browser
    currentTodoList[index].isFinished = !isFinished;
    
    this.setState({
      todoList: currentTodoList,
    });
  };

  changeFilterType = (filterType) => {
    this.setState({
      activeFilter: filterType,
    });
  };

  handleDeleteTodo = (element) => {
    const {id} = element;
    console.log (element);
    deleteDataDiServer(id)
    .then(() => ambilDataDariServer())
    .then((response) =>{
      const data = response.data;
      const parsedData = data.map((element) => {
        return {
          isFinished: element.isDone,
          todoText: element.text,
          id: element.id
        };
      });

      this.setState({
        todoList: parsedData,
      });
    });
  }; 

  render(){
    const todoList = this.state.todoList;
    const activeFilter = this.state.activeFilter;

    const filteredTodoList = todoList.filter((element) => {
      if (activeFilter === "INACTIVE") {
        return !element.isFinished;
      } else if (activeFilter === "ACTIVE") {
        return element.isFinished;
      } else if (activeFilter === "ALL") {
        return true;
      }
    });

    return (
      <div>
        <Input
         val={this.state.inputText}
         onInputChanged={this.handleInputChange}
         onKeyPressed={this.handleKeyPressed}
         />
        <ListTodo 
        onTodoDelete={this.handleDeleteTodo}
        ListToRender={filteredTodoList} 
        onToggleItem={this.handleToggleDone}
        />
        <FilterTodo 
        onChangeFilter={this.changeFilterType}
        currentFilter={this.state.activeFilter}/>
      </div>
    );
  }
}

export default App;