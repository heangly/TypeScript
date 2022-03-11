import { ReactChildren } from 'react'

interface ChildProps {
  color: string
  onClick: (name: string) => void
  children: React.ReactNode
}

export const Child = ({ color, onClick, children }: ChildProps) => {
  return (
    <div>
      {color}
      <button onClick={onClick.bind(null, 'o')}>{children}</button>
    </div>
  )
}

export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  onClick,
  children
}) => {
  return (
    <div>
      {color}
      <button onClick={onClick.bind(null, 'ok')}>{children}</button>
    </div>
  )
}
