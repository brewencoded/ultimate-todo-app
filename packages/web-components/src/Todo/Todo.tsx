import React from "react"
import {Checkbox, ListItem, ListItemText} from "@mui/material"
import TodoCss from "./Todo.module.css"

export type TodoProps = {
  title?: string
  description?: string
}

const Todo = (props: TodoProps) => {
  return (
    <ListItem className={TodoCss["todo"]}>
      <Checkbox />
      <ListItemText primary={props.title} secondary={props.description} />
    </ListItem>
  )
}

export default Todo
