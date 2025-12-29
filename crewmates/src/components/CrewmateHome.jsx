import React from 'react'
import { NavLink } from 'react-router-dom'
import './CrewmateHome.css'

const CrewmateHome = () => {
    return (
        <>
            <div className='main'>
                <img src='among-us-crew.png' />
                <h1 className='heading'>What would you like to do?</h1>
                <div className='selection-container'>
                    <NavLink className='nav-option'
                        to='/create'
                    ><span>New Crewmate</span></NavLink>
                    <NavLink className='nav-option'
                        to='/view'
                    ><span>View Crewmate</span></NavLink>

                </div>
            </div>
        </>
    )
}

export default CrewmateHome
