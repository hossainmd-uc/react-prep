import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SearchCard.css'

const SearchCard = ({ filter, data }) => {
  return (
    <div className="main">
      {data?.results?.map((res) => {
        if (
          res.title.toLowerCase().includes(filter.toLowerCase().trim())
        ) {
          return (
            <div key={res.id} className="container">
              <Link to={`/recipe/${res.id}`} className="card-link">
                <h3 className="title">{res.title}</h3>
                <img className="img" src={res.image} alt={res.title} />
              </Link>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}


export default SearchCard