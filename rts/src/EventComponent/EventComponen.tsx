import React from 'react'

const EventComponen: React.FC = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e)
  }

  return (
    <div>
      <input type='text' onChange={onChange} />
      <div draggable onDragStart={onDragStart}>
        Drag me
      </div>
    </div>
  )
}

export default EventComponen
