import React, { useEffect, useState } from 'react'
import './Cookie.css'
import { Link } from 'react-router';

const Cookie = () => {

  const [multiplier, setMultiplier] = useState(1)

  const [twoX, setTwoX] = useState(() => {
    const saved = localStorage.getItem('powerUps')
    if (saved !== null){
      const list = JSON.parse(saved)
      return list.includes('2x')? true : false
    }

  })

  const [count , setCount] = useState(() => {
    const saved = localStorage.getItem('cookieCount');
    return saved ? JSON.parse(saved): 0;

  })

  useEffect(() => {
    localStorage.setItem('cookieCount', JSON.stringify(count))
  }, [count])

  function increment () {

    setCount(prev => prev + multiplier)

    const saved = localStorage.getItem('powerUps')
    if (saved !== null){
      const list = JSON.parse(saved)
      list.includes('2x') ? setMultiplier(2) : setMultiplier(1)
    }
  }

  function reset () {
    setCount(0)
    localStorage.setItem('powerUps', JSON.stringify([]))

  }

  return (
    <div className='container'>
      <Link to="/" className="home-btn">Back</Link>
      <div className='cookie-container'>
          <h1>Cookie</h1>
            <img src="cookie.png" onClick={increment}/>
          <h1>{count}</h1>
          <button className='reset' onClick={reset}>  Reset </button>
      </div>
    </div>
  )
}

export default Cookie