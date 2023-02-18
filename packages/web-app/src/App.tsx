import React from "react"
import ReactDOM from "react-dom"

import "./index.css";
import Header from './Header'
import Footer from './Footer'
import Todo from 'todo/Todo'
import Button from 'components/Button'
// pulled in thanks to composite tsconfig and npm workspaces
import {ButtonProps} from "@uta/components/src/Button/Button"

const App = () => {
  // since we can't see the types from remote components we'll use the module type definitions
  // alternatively we could have more complex components be in the remote module and
  // simple components be referenced via @module imports
  const buttonProps: ButtonProps = {
    text: "button",
    onClick: () => console.log("I have been clicked")
  }
  return (<div className="container">
    <Header />
    <Todo />
    <Button {...buttonProps} />
    <Footer />
  </div>)
}
ReactDOM.render(<App />, document.getElementById("app"))
