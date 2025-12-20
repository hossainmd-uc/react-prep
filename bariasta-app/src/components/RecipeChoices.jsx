import React, { useState } from "react";
import './RecipeChoices.css'

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    return (
      <div>
        <div className="radio-buttons">
            {choices && choices.map((choice, idx) => {
                    return (<li key={idx}>
                            <input 
                            name={label}
                            id={idx}
                            value={choice}
                            onChange={handleChange}
                            type="radio"
                            checked={checked === choice}
                            />
                            {choice}
           
                        </li>)
            })}
        </div>
      </div>
    );
};

export default RecipeChoices;
