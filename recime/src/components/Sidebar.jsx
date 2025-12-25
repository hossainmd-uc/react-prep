import React from 'react'
import './Sidebar.css'

import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav className='sidebar'>
            <h2 className='side-title'>Recime</h2>
            <div className='side-selections'>
                <Link to={'/about'} >
                <button >About Us</button>
                </Link>
                <button>Saved Recipes</button>
                <hr />
            </div>
        </nav>
    )
}

export default Sidebar