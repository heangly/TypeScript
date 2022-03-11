import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RepositoriesList from './RepositoriesList/RepositoriesList'

const App = () => {
  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Search For a Package</h1>
      <RepositoriesList />
      <ToastContainer theme={'colored'} autoClose={3000} />
    </div>
  )
}

export default App
