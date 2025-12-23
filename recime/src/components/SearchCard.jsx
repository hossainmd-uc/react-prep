import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SearchCard.css'

const SearchCard = ({ data }) => {

  return (
    <div className='main'>
      {

        data?.results?.map((res) => {
          return (
            <div key={res.id} className='container'>
              <Link to={`/recipe/${res.id}`} className='card-link'>
              
                <h3 className='title'>{res.title}</h3>
                <img className='img' src={res.image} />

                </Link >
            </div>
          )

        })

      }
    </div>
  )
}

export default SearchCard