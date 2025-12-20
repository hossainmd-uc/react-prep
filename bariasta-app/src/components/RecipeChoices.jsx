import React, { useState } from "react";
import './RecipeChoices.css'

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
    return (
          <div className="radio-buttons">
          {choices.map((choice, idx) => (
            <li key={idx}>
              <label className="radio">
                <input
                  type="radio"
                  name={label}
                  value={choice}
                  checked={checked === choice}
                  onChange={handleChange}
                />
                <span className="dot" />
                {choice}
              </label>
            </li>
          ))}
       </div>

    );
};

export default RecipeChoices;
