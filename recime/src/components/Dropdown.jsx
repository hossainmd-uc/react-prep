import React from 'react'

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
                        <li
                            key={item.id}
                            onClick={() => selectSuggestion(item)}
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