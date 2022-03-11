import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/app/store'
import { searchRepositories } from '../../redux/features/repositories/repositoriesAction'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.repositories)

  const searchHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!term?.trim()) return
    dispatch(searchRepositories(term))
    setTerm('')
  }

  return (
    <div>
      <form>
        <input
          type='text'
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <button onClick={searchHandler}>Search</button>
      </form>
      <ul>
        {data.length > 0 &&
          data.map((packageName) => <li key={packageName}>{packageName}</li>)}
      </ul>
    </div>
  )
}

export default RepositoriesList
