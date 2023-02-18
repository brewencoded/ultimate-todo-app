import React from "react"
import ReactDOM from "react-dom"
import {StrictMode} from "react"

import Button from './Button/Button'

const App = () => (
  <StrictMode>
    <Button text="button" onClick={() => null}/>
  </StrictMode>
)

ReactDOM.render(<App />, document.getElementById("app"))
