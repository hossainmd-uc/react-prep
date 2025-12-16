import React from 'react'
import './Card.css'

const Card = ({title, src, category}) => {
  return (
    <div className='card'>
        <img src={`https://picsum.photos/200/230?random=${Math.random()}`} />
        <h2>{title}</h2>
        <h5>{category}</h5>
        <button className='button'>Learn More</button>

    </div>
  )
}

export default Card