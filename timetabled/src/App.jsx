import { useState } from 'react'
import './App.css'
import Calendar from'./components/Calendar'

const App = () => {

  return (
    <div className='app'>
      <h1>Project Quinty</h1>
      <h2> Mapped out the details of the Quinty Project </h2>
      <Calendar />
    </div>
  )

}

export default App