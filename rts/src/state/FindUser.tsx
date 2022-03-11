import React, { useState } from 'react'

interface User {
  name: string
  age: number
}

const users: User[] = [
  {
    name: 'Sarah',
    age: 20
  },
  {
    name: 'Alex',
    age: 20
  },
  {
    name: 'Michael',
    age: 20
  }
]

const FindUser: React.FC = () => {
  const [name, setName] = useState('')
  const [fountUsers, setFoundUsers] = useState<User | undefined>(undefined)

  const findUserHandler = () => {
    const searchedUser = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    )
    setFoundUsers(searchedUser)
  }

  return (
    <div>
      <h1>Find User</h1>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={findUserHandler}>Find User</button>

      <div>{fountUsers?.name}</div>
      <div>{fountUsers?.age}</div>
    </div>
  )
}

export default FindUser
