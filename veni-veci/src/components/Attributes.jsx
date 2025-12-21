import React, { useState } from 'react'
import './Attributes.css'

const Attributes = ({addBan, data}) => {

    useState(() => {
        console.log(data)
    }, [data])

  return (
    <div >
        {data.length > 0 && data.map((element, i) => {
            console.log(element.breeds[0])
            return(
                <div className='attributes' key={element.breeds[0].name + ' ' + i}>
                    <h5>Name</h5>
                    <button onClick={() => {addBan(element.breeds[0].name)}}>{element.breeds[0].name}</button>
                    <h5>Origin</h5>
                    <button onClick={() => {addBan(element.breeds[0].origin)}}>{element.breeds[0].origin}</button>
                    <h5>Temperament</h5>
                    {
                        element.breeds[0].temperament.split(',').map((temp, i) => {
                            return(
                                <button onClick={() => {addBan(temp)}}>{temp}</button>
                            )
                        })
                    }
                </div>
            )
        })
        
        }
    </div>
  )
}

export default Attributes