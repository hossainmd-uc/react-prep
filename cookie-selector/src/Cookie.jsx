import React, { useEffect, useState } from 'react'
import './Cookie.css'

const Cookie = () => {

  const [count , setCount] = useState(() => {
    const saved = localStorage.getItem('cookieCount');
    return saved ? JSON.parse(saved): 0;

  })

  useEffect(() => {
    localStorage.setItem('cookieCount', JSON.stringify(count))
  }, [count])

  function increment () {
    setCount(prev => prev + 1)
  }

  function reset () {
    setCount(0)

  }

  return (
    <div className='cookie-container'>
        <h1>Cookie</h1>
        <img src="cookie.png" onClick={increment}/>
        <h1>{count}</h1>
        <button className='reset' onClick={reset}>  Reset </button>
    </div>
  )
}

export default Cookie