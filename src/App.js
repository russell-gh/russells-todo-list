import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    todos: [
      { name: "Clean Car", done: false },
      { name: "Clean House", done: false },
      { name: "Buy milk", done: false },
    ],
  };

  onInput = (e) => {
    this.setState({ userInput: e.target.value });
  };

  onAdd = () => {
    //check the user actually entered something
    if (!this.state.userInput || this.state.userInput.length < 4) {
      return;
    }

    //defensive check, if the item already exists, ignore it
    const result = this.state.todos.some((item) => {
      return item.name === this.state.userInput;
    });

    //if the item was found, skip it
    if (result) {
      return;
    }

    //copy user input unto the todos array
    const todo = { done: false, name: this.state.userInput };
    this.setState({ todos: [...this.state.todos, todo] });
  };

  onDelete = (name) => {
    //remove and item

    const index = this.state.todos.findIndex((todo) => todo.name === name);

    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({ todos });
  };

  onDoneToggle = (name) => {
    const index = this.state.todos.findIndex((todo) => todo.name === name);

    const todos = [...this.state.todos];

    todos[index].done = !todos[index].done;

    this.setState({ todos });
  };

  render() {
    return (
      <>
        {/* user input controls */}
        <div className="controls">
          <input onInput={this.onInput} type="text" />
          <button onClick={this.onAdd}>Add</button>
        </div>

        {/* below is the code that creates the todo display */}
        {this.state.todos.map((todo) => (
          <div className={todo.done ? "done todoItem" : "undone todoItem"}>
            <p>{todo.name}</p>
            <button onClick={() => this.onDoneToggle(todo.name)}>
              {todo.done ? "Undo" : "Do"}
            </button>
            <button onClick={() => this.onDelete(todo.name)}>Delete</button>
          </div>
        ))}
      </>
    );
  }
}

export default App;
