import React from 'react'
import './Event.css'

const Event = ({event, color}) => {

  return (
    
    <div className={"Event " + color}>
        <h5>{event || "none"}</h5>
    </div>
  
)
  }

export default Event