import React from 'react'
import './Dropdown.css'

const Dropdown = ({ setParams, suggestions }) => {

    function selectSuggestion(item){

        setParams((prev) => {
            return { ...prev, ['query'] : item.title}
        } )
    }

    return (
        <>
            {suggestions.length > 1 && (

                <ul className="dropdown">
                    {suggestions.map(item => (
                        <li className='auto-options'
                            key={item.id}
                            onMouseDown={() => selectSuggestion(item)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>

            )}

        </>
    )

}



export default Dropdown