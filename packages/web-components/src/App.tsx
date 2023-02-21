import React from "react"
import ReactDOM from "react-dom"
import {StrictMode} from "react"

import Button from "./Button/Button"
import Header from "./Header/Header"
import Todo from "./Todo/Todo"

const App = () => (
  <StrictMode>
    <Button text="button" />
    <Header />
    <Todo title="Test" description="This is a description" />
  </StrictMode>
)

ReactDOM.render(<App />, document.getElementById("app"))
