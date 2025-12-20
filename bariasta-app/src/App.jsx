import { useState } from 'react'
import './App.css'
import BaristaForm from './components/BaristaForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <head>
        <title>OMG Coffee</title>
        <link rel="icon" href="coffee.png" type="image/png" />
      </head>
      <div className='main-container'>
        <div>
        <img src='coffee2.png'/>
        <h1 className='title'>On My Grind</h1>
        </div>
        <p>"So you think you can barista? Let's put that to the test..."</p>
      </div>
      <div>
        <BaristaForm />
      </div>
    </>
  )
}

export default App
