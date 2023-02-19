import {DynamoDB} from "aws-sdk"
import { CreateTodo, Todo } from "@uta/models/Todo"

type WrappedFn<A extends any[], R> = (...parameters: A) => R

const table = new DynamoDB.DocumentClient({
  region: "us-east-1"
})

export const createTodo = async (dynamodb: DynamoDB.DocumentClient, partialTodo: CreateTodo): Promise<Todo> => {
  const date = new Date().toISOString()
  const todo: Todo = {
    ...partialTodo,
    todoId: "uuid",
    createdDate: date,
    updatedDate: date,
  }
  const input: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TODO_TABLE!,
    Item: todo
  }
  try {
    await dynamodb.put(input).promise()
    return todo 
  } catch (error) {
    return {} as Todo // TODO: error
  }
}

export const TodoService = (dynamodb = table) =>
  <A extends any[], R>(fn: (dynamodb: DynamoDB.DocumentClient, ...args: A) => R): WrappedFn<A, R> =>
    (...args: A) => fn(dynamodb, ...args)