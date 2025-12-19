import { useState } from 'react'
import './App.css'
import Cookie from './Cookie'
import Shop from './Shop'

import { Routes, Route } from 'react-router'
import Home from './Home'

function App() {


  return (
    <>
      <div>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='cookie' element={<Cookie />}></Route>
            <Route path='shop' element={<Shop />}></Route>

          </Routes>




      </div>
    </>
  )
}

export default App
