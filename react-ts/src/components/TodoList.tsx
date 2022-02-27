import React from 'react'
import './TodoList.css'

interface TodoListProps {
  items: { id: string; text: string }[]
  onDeleteTodo: (todoId: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  const deleteHandler = (id: string) => {
    onDeleteTodo(id)
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.text}</span>{' '}
          <button onClick={deleteHandler.bind(null, item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
