import React from 'react'
import './Cat.css'

const Cat = ({img}) => {

  return (
    <>
        <img className='cat-img' src={img} />

    </>
  )
}

export default Cat