import React from "react"
import ReactDOM from "react-dom"

import "./App.css";
import Footer from './Footer'
import TodoApp from 'todo/TodoApp'
import Button from 'components/Button'
import Header from 'components/Header'
// pulled in thanks to composite tsconfig and npm workspaces
import {ButtonProps} from "@uta/components/src/Button/Button"
import {TodoAppProps} from "@uta/todo/src/TodoApp"

const testTodos = [
  {title: "Test", description: "This is a description"},
  {title: "Test 2", description: "This is another description"},
  {title: "Test 3", description: "You get the point"}
]

const App = () => {
  // since we can't see the types from remote components we'll use the module type definitions
  // alternatively we could have more complex components be in the remote module and
  // simple components be referenced via @module imports
  const buttonProps: ButtonProps = {
    text: "save",
    onClick: () => console.log("I have been clicked")
  }
  const todoAppProps: TodoAppProps = {
    todos: testTodos
  }
  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <TodoApp {...todoAppProps} />
        <Button {...buttonProps} />
        <Footer />
      </div>
    </React.Fragment>
  )
}
ReactDOM.render(<App />, document.getElementById("app"))
