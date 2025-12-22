import React, { useEffect } from 'react'
import './SearchCard.css'

const SearchCard = ({data}) => {

  return (
    <div className='main'>
        {
  
        data?.results?.map((res) => {
            return(
                <div key={res.id} className='container'>
                    <h3 className='title'>{res.title}</h3>
                    <img className='img' src={res.image}/>
                </div>
            )

        })

        }
    </div>
  )
}

export default SearchCard