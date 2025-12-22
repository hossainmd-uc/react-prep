import React from 'react'
import './SearchCard.css'

const SearchCard = ({data}) => {

  return (
    <div className='main'>
        {

        data && data.results.map((res, i) => {
            return(
                <div className='container'>
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