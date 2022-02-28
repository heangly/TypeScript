import { RequestHandler } from 'express'
import Todo from '../model/todos'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text

  if (!text) throw new Error('test cannot be empty')

  const newTodo = new Todo(Math.random().toString(), text)
  TODOS.push(newTodo)

  res.status(201)
  res.json({ message: 'Created the todo.', createTodo: newTodo })
}

export const getTodos: RequestHandler = (req, res) => {
  res.json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id
  const updatedText = (req.body as { text: string }).text
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)

  if (todoIndex === -1) throw new Error('Could not find todo')

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

  res.status(200)
  res.json({ message: 'updated!', updateTodo: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)
  if (todoIndex === -1) throw new Error('Could not find todo')
  TODOS.splice(todoIndex, 1)
  res.status(200)
  res.json({ message: 'Todo deleted!' })
}
