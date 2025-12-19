import React, { useEffect, useState } from 'react'
import './Shop.css'

const Shop = () => {

  const [count, setCount] = useState(() => {

    const currentCount = localStorage.getItem('cookieCount')
    return currentCount ? JSON.parse(currentCount) : 0;

  })

  const [twoX, setTwoX] = useState(() => {

    const powerUps = localStorage.getItem('powerUps')

    if (powerUps == null){
      localStorage.setItem('powerUps', JSON.stringify([]))
      return false

    }

    try {
      const parsedList = JSON.parse(powerUps);
      return Array.isArray(parsedList) && parsedList.includes('2x');
    } catch (e) {
      return false;
    }
  })

  function two_x () {

    if (!twoX){

      if (count >= 100) {
        const rawPowerUps = localStorage.getItem('powerUps')
        const list = rawPowerUps ? JSON.parse(rawPowerUps) : [];

        list.push('2x')
        setCount(prev => prev - 100)
        const nextCount = count - 100;

        localStorage.setItem('cookieCount', JSON.stringify(nextCount))
        localStorage.setItem('powerUps', JSON.stringify(list))
      }else{
        alert("Not enough cookie clicks!")
      }

      }else{
        alert("Already have this power up!")
      }
    }


  return (
    <div>
        
        <h1>Shop</h1>

        <h4>Cookie Clicks: {count}</h4>
        <h4>Active Powerups: 2x {twoX}</h4>

        <h3>2x clicks</h3>
        <p>Cost: 100 clicks</p>
        <button className='power-up-btns' onClick={two_x}> {twoX ? 'Own': 'Buy' } </button>
        <h3>4x clicks</h3>
        <p>Cost: 300 clicks</p>
        <button className='power-up-btns'> Buy </button>


    </div>
  )
}

export default Shop