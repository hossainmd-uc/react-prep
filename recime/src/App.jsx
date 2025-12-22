import { useState } from 'react'
import './App.css'
import Search from './components/Search'

function App() {

  const [searchData, setSearchData] = useState([])

  const api_key = import.meta.env.VITE_API_KEY
  return (
    <>
      <div>
        <Search setSearchData={setSearchData} searchData={searchData} />
      </div>

    </>
  )
}

export default App
