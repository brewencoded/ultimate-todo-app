// Data
export type Todo = {
  todoId: string
  userId: string
  description: string
  createdDate: string
  updatedDate: string
  dueDate?: string
}

// API
export type CreateTodo = Pick<Todo, "userId"|"description"|"dueDate">