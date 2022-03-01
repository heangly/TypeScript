import React, { useState } from 'react'
import { IState as Props } from '../App'

interface InputType {
  name: string
  age: string
  note?: string
  img: string
}

interface IProps {
  setPeople: React.Dispatch<React.SetStateAction<Props['people']>>
}

const AddToList: React.FC<IProps> = ({ setPeople }) => {
  const [input, setInput] = useState<InputType>({
    name: '',
    age: '',
    note: '',
    img: ''
  })

  const { name, age, note, img } = input

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const addToListHandler = (): void => {
    if (!name || !age || !img) return
    setPeople((prevState) => [...prevState, { ...input }])
    setInput({
      name: '',
      age: '',
      note: '',
      img: ''
    })
  }

  return (
    <div className='AddToList'>
      <input
        className='AddToList-input'
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={inputChangeHandler}
      />
      <input
        className='AddToList-input'
        type='text'
        placeholder='Age'
        name='age'
        value={age}
        onChange={inputChangeHandler}
      />
      <input
        className='AddToList-input'
        type='text'
        placeholder='Image URL'
        name='img'
        value={img}
        onChange={inputChangeHandler}
      />
      <textarea
        className='AddToList-input'
        placeholder='Note'
        name='note'
        value={note}
        onChange={inputChangeHandler}
      />

      <button onClick={addToListHandler} className='AddToList-btn'>
        Add to list
      </button>
    </div>
  )
}

export default AddToList
