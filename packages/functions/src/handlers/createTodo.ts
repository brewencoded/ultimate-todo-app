import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import {Todo} from "@uta/models/Todo"
import { BadRequest } from "src/utils/error.utils";
import { createTodo, TodoService } from "src/services/todo.service";

/**
 * Create a todo
 * path /api/todo
 * method POST
 * body 
 */
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (typeof event.body !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify(BadRequest("Missing body"))
    }
  }
  const todo = JSON.parse(event.body) as Todo
  const todoService = TodoService()
  const create = todoService(createTodo)
  const created = await create(todo)
  return {
    statusCode: 200,
    body: JSON.stringify({todo: created })
  }
}
