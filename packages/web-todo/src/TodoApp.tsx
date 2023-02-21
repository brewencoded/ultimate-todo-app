import React from "react"
import {Card, CardContent, Divider, List} from "@mui/material"

import "./index.css"

import Todo from "components/Todo"
import {TodoProps} from "@uta/components/src/Todo/Todo"

export type TodoAppProps = {
  todos?: TodoProps[]
}

const TodoApp = (props: TodoAppProps) => (
  <Card sx={{ minWidth: 275, maxWidth: 360 }}>
    <CardContent>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {props.todos?.map(todo => (
          <React.Fragment key={todo.title}>
            <Todo {...todo} />
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
)

export default TodoApp
