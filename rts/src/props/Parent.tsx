import { ChildAsFC } from './Child'

const Parent = () => {
  const onClick = (name: string) => {
    console.log(name)
  }
  return (
    <ChildAsFC onClick={onClick} color='black'>
      <h1>Hello</h1>
    </ChildAsFC>
  )
}

export default Parent
