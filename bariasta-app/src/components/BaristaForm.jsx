import React, {useState} from 'react'
import './BaristaForm.css'
import RecipeChoices from './RecipeChoices';

import drinksJson from "./drinks.json"


const BaristaForm = () => {


    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');


    const [drink, setDrink] = useState({
        'name': '',
        'ingredients': ''
    })

    const getNextDrink = () => {
        const random = Math.floor(Math.random() * drinksJson.drinks.length)

        setDrink((prev) => ({
            ...prev, 
            'name':  drinksJson.drinks[random].name, 
            'ingredients': drinksJson.drinks[random].ingredients

        }))

    }


    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }





    const onNewDrink = () => {
        setInputs({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': '' });
        
        getNextDrink();

        setCheckedTemperature('');
        setCheckedSyrup('');
        setCheckedMilk('');
        setCheckedBlended('');

    }

    const onCheckAnswer = () => {

        const trueIngredients = drink.ingredients

        const milkCorrect = trueIngredients.milk === inputs.milk;
        const tempCorrect = trueIngredients.temp === inputs.temperature;
        const syrupCorrect = trueIngredients.syrup === inputs.syrup;
        const blendedCorrect = trueIngredients.blended === inputs.blended;

        if (!tempCorrect){
            setCheckedTemperature('wrong');
        }
        else {
            setCheckedTemperature("correct");
        }

        if (!syrupCorrect){
            setCheckedSyrup('wrong');
        }
        else {
            setCheckedSyrup("correct");
        }

        if (!milkCorrect){
            setCheckedMilk('wrong');
        }
        else {
            setCheckedMilk("correct");
        }

        if (!blendedCorrect){
            setCheckedBlended('wrong');
        }
        else {
            setCheckedBlended("correct");
        }

        console.log({"milk": milkCorrect})
        console.log({"temp": tempCorrect})
        console.log({"blended": blendedCorrect})
        console.log({"syrup": syrupCorrect})

    };

  return (
    <div>
        <h2>Hi, I'd like to order a:</h2>

        <div className="drink-container">
            <h2 className="mini-header">{drink['name']}</h2>
            <button
                className="button newdrink"
                onClick={onNewDrink}>
                🔄
            </button>
        </div>


        <form className='container'>

            <div className="mini-container">
                <h3>Temperature</h3>
                <div className={'answer-space ' + correct_temp } >
                    {inputs["temperature"]} 
                </div>

                <RecipeChoices 
                handleChange={(e) => setInputs((prev) => ({
                    ...prev, [e.target.name]: e.target.value, 
                }))}

                label="temperature"
                choices={ingredients["temperature"]}
                checked={inputs["temperature"]}
                />
            </div>
            
            <div className="mini-container">
                <h3>Syrup</h3>
                <div className={'answer-space ' + correct_syrup} id={correct_syrup}>
                    {inputs["syrup"]} 
                </div>

                <RecipeChoices 
                handleChange={(e) => setInputs((prev) => ({
                    ...prev, [e.target.name]: e.target.value, 
                }))}

                label="syrup"
                choices={ingredients["syrup"]}
                checked={inputs["syrup"]}
                />
           </div>

           <div className="mini-container">
                <h3>Milk</h3>
                <div className={'answer-space ' + correct_milk } >
                    {inputs["milk"]} 
                </div>

                <RecipeChoices 
                handleChange={(e) => setInputs((prev) => ({
                    ...prev, [e.target.name]: e.target.value, 
                }))}

                label="milk"
                choices={ingredients["milk"]}
                checked={inputs["milk"]}
                />
            </div>

            <div className="mini-container">
            <h3>Blended</h3>
            <div className={'answer-space ' + correct_blended} >
                {inputs["blended"]} 
            </div>

            <RecipeChoices 
            handleChange={(e) => setInputs((prev) => ({
                ...prev, [e.target.name]: e.target.value, 
            }))}

            label="blended"
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
            />
            </div>
            
        </form>

        <button className="button submit" onClick={onCheckAnswer}>
            Check Answer
        </button>

        <button className="button newdrink" onClick={onNewDrink}>
            New Drink
        </button>
    </div>

  )
}

export default BaristaForm