import React, { useEffect } from 'react'
import { useState } from 'react'

import './Search.css'
import SearchCard from './SearchCard'
import Dropdown from './Dropdown'

const Search = ({searchData, setSearchData}) => {

    const [params, setParams] = useState({
        query: '',
        quantity: '',
        cuisine: '', 
        diet: '',
        min_protein: '', 
        max_carbs: '',
        max_calories: '', 
    })

    const [queryAuto, setQueryAuto] = useState([])

    async function queryAutocomplete (){

        const apiKey = import.meta.env.VITE_API_KEY

        const rawParams = {
            apiKey,
            query: params.query,
            cuisine: params.cuisine,
            minProtein: params.min_protein,
            maxCarbs: params.max_carbs,
            maxCalories: params.max_calories,
            number: params.quantity

        }


        const queryParams = new URLSearchParams(Object.entries(rawParams).filter(([_, x]) => (x !== '' && x !== undefined)))
        const url = `https://api.spoonacular.com/recipes/autocomplete?${queryParams}`

        
        try {
            const response = await fetch(url)

            if (!response.ok){
                throw new Error(`HTTP ${response.status}`)
            }else{
                const data = await response.json()
                console.log(data)
                setQueryAuto(data)
            }

        }catch (e){
            console.log(`Exception: ${e}`)
        }
        
    }

    useEffect(() => {
        if (!params.query){
            setQueryAuto([])
            return
        }

        const t = setTimeout(queryAutocomplete, 300)
        return () => clearTimeout(t)
        
    }, [params.query])


    function adjustParams(e) {
        const {name, value} = e.target

        setParams((prev) => {
            return {...prev, [name]: value}
        })
    }
async function search(e) {
        
        e.preventDefault();

        const apiKey = import.meta.env.VITE_API_KEY
        const rawParams = {
                query: params.query,
                apiKey,
                cuisine: params.cuisine,
                minProtein: params.min_protein,
                maxCarbs: params.max_carbs,
                maxCalories: params.max_calories,
                number: params.quantity,
            };
        const queryParams = new URLSearchParams(
            Object.entries(rawParams).filter(([_, value]) => (value !== undefined && value !== '')));

        
        const url = `https://api.spoonacular.com/recipes/complexSearch?${queryParams.toString()}`
        console.log(url)

        try{
            const response = await fetch(url)

            if (!response.ok){
                throw new Error(`HTTP ${response.status}`)
            }
            const parsed = await response.json()
            console.log(parsed)
            setSearchData(parsed)

        }catch (e){
            console.log(`Exception detected: ${e}`)
        }

    }


  return (
    <div>
        <form onSubmit={search}>
            <div className='input-container'>
            {
                Object.keys(params).map((key) => {
                    return (
                        <div key={key} className={`input-subcontainer ${key === 'query'? 'autocomplete' : ""}`}>
                            <h5>{key}</h5>
                                <input 
                                onChange={adjustParams} 
                                className='search-input' 
                                value={params[key]} 
                                name={key} 
                                type='text' />
                            {key=='query' && <Dropdown setParams={setParams} suggestions={queryAuto}/>}
                        </div>
                    )
                }) 
            }
            <button type='submit' >Recime!</button>
            </div>
        </form>

        <div className='results'>
            {searchData && <SearchCard data={searchData}/>}
        </div>
    </div>
  )
}

export default Search