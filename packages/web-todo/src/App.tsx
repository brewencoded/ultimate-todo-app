import React from "react"
import ReactDOM from "react-dom"

import TodoApp from "./TodoApp"

const testTodos = [
  {title: "Test", description: "This is a description"},
  {title: "Test 2", description: "This is another description"},
  {title: "Test 3", description: "You get the point"}
]

const App = () => (
  <TodoApp todos={testTodos}/>
);
ReactDOM.render(<App />, document.getElementById("app"));
