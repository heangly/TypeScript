import './App.css'
import { useState } from 'react'
import List from './components/List'
import AddToList from './components/AddToList'

export interface IState {
  people: {
    name: string
    img: string
    age: string
    note?: string
  }[]
}

function App() {
  const [people, setPeople] = useState<IState['people']>([
    {
      name: '',
      img: '',
      age: '',
      note: ''
    }
  ])

  return (
    <div className='App'>
      <h1>People Invite to My Party</h1>
      <List people={people} />
      <AddToList setPeople={setPeople} />
    </div>
  )
}

export default App
