import React, { useState } from 'react'

const GuestList: React.FC = () => {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState<string[]>([])

  const addGuestHandler = () => {
    setGuests([...guests, name])
    setName('')
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addGuestHandler()
    }
  }

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((guest) => (
          <li key={Math.random().toString()}>{guest}</li>
        ))}
      </ul>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        onKeyDown={keyDownHandler}
      />
      <button onClick={addGuestHandler}>Add Guest</button>
    </div>
  )
}

export default GuestList
