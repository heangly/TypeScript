import React, { useRef } from 'react'
import './NewTodo.css'

type NewTodoProps = {
  onAddTodo: (text: string) => void
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const todoSubmitHandlerr = (event: React.FormEvent) => {
    event.preventDefault()
    const enteredText = textInputRef.current?.value
    if (!enteredText) return

    onAddTodo(enteredText)
    textInputRef.current.value = ''
  }

  return (
    <form onSubmit={todoSubmitHandlerr}>
      <div className='form-control'>
        <label htmlFor='todo-text'>Todo text</label>
        <input ref={textInputRef} type='text' id='todo-text' />
      </div>

      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default NewTodo
