import { IState as IProp } from '../App'

const List: React.FC<IProp> = ({ people }) => {
  const renderList = (): JSX.Element[] => {
    return people.map((person, index) => (
      <li key={index} className='List'>
        <div className='List-header'>
          <img src={person.img} alt={person.name} className='List-img' />
          <h2>{person.name}</h2>
        </div>
        <p>{person.age} years old</p>
        <p className='List-note'>{person.note}</p>
      </li>
    ))
  }

  return <ul>{renderList()}</ul>
}

export default List
