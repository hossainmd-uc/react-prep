import { useState } from 'react'
import './App.css'
import HubHome from './components/HubHome'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NewPost from './components/NewPost'
import Posts from './components/Posts'

function App() {

  return (
    <BrowserRouter>

      <HubHome />
      <Routes>
        <Route path='/new' element={<NewPost />} />
        <Route path='/view' element={<Posts />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
