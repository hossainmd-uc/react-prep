import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeDetails from './components/RecipeDetails'
import About from './components/About'
import Sidebar from './components/Sidebar'

function App() {

  const [searchData, setSearchData] = useState({})

  const api_key = import.meta.env.VITE_API_KEY
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search setSearchData={setSearchData} searchData={searchData} />}/> 
        <Route path='/recipe/:id' element={<RecipeDetails />}/> 
        <Route path='/about' element={<About />}/>

      </Routes>

      <Sidebar />

    </BrowserRouter>

  )
}

export default App
