import React from 'react'
import './Home.css'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='container'>

        <p className='title' >Cookie Clicker Mania</p>
        
        <div className='body'>
        
        <Link to="/cookie" class="btn">Go to Cookie Clicker</Link>
        <Link to="/shop" class="btn">Visit Shop</Link>
        </div>

    </div>
  )
}

export default Home

